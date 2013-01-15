##############################
# Definitions
##############################
NAMESPACE = scratch
COMPILATION_LEVEL = WHITESPACE_ONLY
FORMATTING = PRETTY_PRINT
GSS_RENAME = NONE
DEBUG_FLAG = -f --define -f goog.DEBUG=false

SRC_DIR = src
OUT_DIR = build
GEN_DIR = gen

SOY_COMPILER = ../closure-templates/build/SoyToJsSrcCompiler.jar
SOY_FLAGS = --cssHandlingScheme GOOG --useGoogIsRtlForBidiGlobalDir --shouldProvideRequireSoyNamespaces --shouldGenerateGoogMsgDefs 

GSS_COMPILER = ../closure-stylesheets/build/closure-stylesheets.jar
GSS_FLAGS = --pretty-print --output-renaming-map-format CLOSURE_COMPILED --rename $(GSS_RENAME)

SOY_FILES = $(wildcard $(SRC_DIR)/*.soy)
GEN_SOY_JS_FILES = $(patsubst $(SRC_DIR)/%, $(GEN_DIR)/%.js, $(SOY_FILES))

RAW_JS_FILES = $(wildcard $(SRC_DIR)/*.js)
GEN_RAW_JS_FILES = $(patsubst $(SRC_DIR)/%, $(GEN_DIR)/%, $(RAW_JS_FILES))

GSS_FILES = $(wildcard $(SRC_DIR)/*.gss)
GSS_RENAMING_MAP = $(OUT_DIR)/renaming_map.js
GSS_CSS = $(OUT_DIR)/scratch.css
GEN_GSS_JS_FILES =
OUT_GSS_FILES = $(GSS_RENAMING_MAP) $(GSS_CSS)

BLOCKLY_DIR = third_party/blockly

CLOSURE_COMPILER = ../closure-compiler/build/compiler.jar
CLOSURE_BUILDER = ../closure-library/closure/bin/build/closurebuilder.py
CLOSURE_ROOTS = ../closure-library $(GEN_DIR) $(BLOCKLY_DIR)
CLOSURE_ROOT_FLAGS = $(foreach root, $(CLOSURE_ROOTS), --root $(root))
CLOSURE_FLAGS = -o compiled -f --compilation_level -f $(COMPILATION_LEVEL) -f --formatting -f $(FORMATTING) 

GEN_JS_FILES = $(GEN_SOY_JS_FILES) $(GEN_RAW_JS_FILES) $(GEN_GSS_JS_FILES)
GEN_FILES = $(GEN_JS_FILES)
OUT_JS_FILES = $(OUT_DIR)/$(subst .,_,$(NAMESPACE)).js
OUT_COPY_FILES = $(patsubst $(SRC_DIR)/%, $(OUT_DIR)/%, $(wildcard $(SRC_DIR)/*.html))
OUT_BLOCKLY_COPY_FILES = $(patsubst $(BLOCKLY_DIR)/%, $(OUT_DIR)/%, $(wildcard $(BLOCKLY_DIR)/media/*))
OUT_FILES = $(OUT_JS_FILES) $(OUT_GSS_FILES) $(OUT_COPY_FILES) $(OUT_BLOCKLY_COPY_FILES)

COMPILERS = $(SOY_COMPILER) $(CLOSURE_COMPILER) $(GSS_COMPILER)

##############################
# Rules
##############################
all: $(OUT_DIR) $(GEN_DIR) $(OUT_FILES)

clean:
	-rm -f $(GEN_JS_FILES) $(OUT_JS_FILES)
	-rm -rf $(OUT_DIR) $(GEN_DIR)

$(SOY_COMPILER): ../closure-templates/java/src/com/google/template/soy/SoyToJsSrcCompiler.java
	(cd ../closure-templates; ant SoyToJsSrcCompiler)

$(CLOSURE_COMPILER): ../closure-compiler/src/com/google/javascript/jscomp/*
	(cd ../closure-compiler; ant jar)

$(GSS_COMPILER): ../closure-stylesheets/src/com/google/common/css/*
	(cd ../closure-stylesheets; ant jar)

$(OUT_DIR) $(GEN_DIR) $(OUT_DIR)/media:
	-mkdir $@

$(GEN_SOY_JS_FILES): $(GEN_DIR)/%.js : $(SRC_DIR)/% $(SOY_COMPILER)
	java -jar $(SOY_COMPILER) $(SOY_FLAGS) --outputPathFormat $@ --srcs $< || rm $@
	perl -pi -e 's/soy/goog.soy/g; s/soydata/soy.data/g' $@ || rm $@

$(GEN_RAW_JS_FILES): $(GEN_DIR)/% : $(SRC_DIR)/%
	cp $< $@

$(OUT_COPY_FILES): $(OUT_DIR)/% : $(SRC_DIR)/%
	cp $< $@

$(OUT_BLOCKLY_COPY_FILES): $(OUT_DIR)/media/% : $(BLOCKLY_DIR)/media/% $(OUT_DIR)/media
	cp $< $@

$(GSS_RENAMING_MAP): $(GSS_CSS)

$(GSS_CSS): $(GSS_FILES) $(GSS_COMPILER)
	java -jar $(GSS_COMPILER) $(GSS_FLAGS) --output-renaming-map $(GSS_RENAMING_MAP) --output-file $(GSS_CSS) $(GSS_FILES) || rm $(OUT_GSS_FILES)

$(OUT_JS_FILES): $(GEN_FILES) $(CLOSURE_COMPILER)
	python $(CLOSURE_BUILDER) $(DEBUG_FLAG) -c $(CLOSURE_COMPILER) $(CLOSURE_ROOT_FLAGS) $(CLOSURE_FLAGS) --namespace $(NAMESPACE) --output_file $@ || rm $@
