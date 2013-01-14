##############################
# Definitions
##############################
NAMESPACE = hello.world
COMPILATION_LEVEL = WHITESPACE_ONLY
FORMATTING = PRETTY_PRINT

SRC_DIR = src
OUT_DIR = build
GEN_DIR = gen

SOY_COMPILER = ../closure-templates/build/SoyToJsSrcCompiler.jar
CLOSURE_COMPILER = ../closure-compiler/build/compiler.jar
COMPILERS = $(SOY_COMPILER) $(CLOSURE_COMPILER)

SOY_FILES = $(wildcard $(SRC_DIR)/*.soy)
GEN_SOY_JS_FILES = $(patsubst $(SRC_DIR)/%, $(GEN_DIR)/%.js, $(SOY_FILES))

RAW_JS_FILES = $(wildcard $(SRC_DIR)/*.js)
GEN_RAW_JS_FILES = $(patsubst $(SRC_DIR)/%, $(GEN_DIR)/%, $(RAW_JS_FILES))

GEN_JS_FILES = $(GEN_SOY_JS_FILES) $(GEN_RAW_JS_FILES)
OUT_JS_FILES = $(OUT_DIR)/$(subst .,_,$(NAMESPACE)).js

CLOSURE_BUILDER = ../closure-library/closure/bin/build/closurebuilder.py
CLOSURE_ROOTS = ../closure-library $(GEN_DIR)
CLOSURE_ROOT_FLAGS = $(foreach root, $(CLOSURE_ROOTS), --root $(root))

##############################
# Rules
##############################
all: $(OUT_DIR) $(GEN_DIR) $(OUT_JS_FILES)

clean:
	-rm -f $(GEN_JS_FILES) $(OUT_JS_FILES)

$(SOY_COMPILER): ../closure-templates/java/src/com/google/template/soy/SoyToJsSrcCompiler.java
	(cd ../closure-templates; ant SoyToJsSrcCompiler)

$(CLOSURE_COMPILER): ../closure-compiler/src/com/google/javascript/jscomp/*
	(cd ../closure-compiler; ant jar)

$(OUT_DIR) $(GEN_DIR):
	-mkdir $@

$(GEN_SOY_JS_FILES): $(GEN_DIR)/%.js : $(SRC_DIR)/% $(SOY_COMPILER)
	java -jar $(SOY_COMPILER) --useGoogIsRtlForBidiGlobalDir --shouldProvideRequireSoyNamespaces --shouldGenerateGoogMsgDefs --outputPathFormat $@ --srcs $< || rm $@
	perl -pi -e 's/soy/goog.soy/g; s/soydata/soy.data/g' $@ || rm $@

$(GEN_RAW_JS_FILES): $(GEN_DIR)/% : $(SRC_DIR)/%
	cp $< $@

$(OUT_JS_FILES): $(GEN_JS_FILES) $(CLOSURE_COMPILER)
	python $(CLOSURE_BUILDER) -c $(CLOSURE_COMPILER) $(CLOSURE_ROOT_FLAGS) --namespace $(NAMESPACE) --output_file $@ -o compiled -f --compilation_level -f $(COMPILATION_LEVEL) -f --formatting -f $(FORMATTING) || rm $@
