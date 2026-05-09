"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Copy, Download, RotateCcw, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToolEvents } from "@/lib/analytics";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TsTarget =
  | "ES5"
  | "ES6"
  | "ES2016"
  | "ES2017"
  | "ES2018"
  | "ES2019"
  | "ES2020"
  | "ES2021"
  | "ES2022"
  | "ESNext";

type TsModule =
  | "CommonJS"
  | "ESNext"
  | "ES2015"
  | "ES2020"
  | "NodeNext"
  | "Node16"
  | "None";

type TsModuleResolution =
  | "node"
  | "node16"
  | "nodenext"
  | "bundler"
  | "classic";

type TsJsx = "preserve" | "react" | "react-jsx" | "react-jsxdev" | "none";

type ProjectPreset = "nextjs" | "react" | "nodejs" | "library" | "browser";

interface TsConfig {
  target: TsTarget;
  module: TsModule;
  moduleResolution: TsModuleResolution;
  lib: string[];
  jsx: TsJsx | null;
  outDir: string;
  rootDir: string;
  strict: boolean;
  strictNullChecks: boolean;
  noImplicitAny: boolean;
  esModuleInterop: boolean;
  allowSyntheticDefaultImports: boolean;
  skipLibCheck: boolean;
  resolveJsonModule: boolean;
  noEmit: boolean;
  declaration: boolean;
  declarationMap: boolean;
  sourceMap: boolean;
  noUnusedLocals: boolean;
  noUnusedParameters: boolean;
  noFallthroughCasesInSwitch: boolean;
  forceConsistentCasingInFileNames: boolean;
  incremental: boolean;
  composite: boolean;
  allowJs: boolean;
  checkJs: boolean;
  removeComments: boolean;
  experimentalDecorators: boolean;
  paths: boolean;
  include: string;
  exclude: string;
}

// ---------------------------------------------------------------------------
// Presets
// ---------------------------------------------------------------------------

const presets: Record<ProjectPreset, Partial<TsConfig>> = {
  nextjs: {
    target: "ES5",
    module: "ESNext",
    moduleResolution: "bundler",
    lib: ["dom", "dom.iterable", "esnext"],
    jsx: "preserve",
    strict: true,
    strictNullChecks: true,
    noImplicitAny: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
    resolveJsonModule: true,
    noEmit: true,
    declaration: false,
    declarationMap: false,
    sourceMap: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: true,
    forceConsistentCasingInFileNames: true,
    incremental: true,
    composite: false,
    allowJs: false,
    checkJs: false,
    removeComments: false,
    experimentalDecorators: false,
    paths: true,
    outDir: "",
    rootDir: "",
    include: "next-env.d.ts, **/*.ts, **/*.tsx",
    exclude: "node_modules",
  },
  react: {
    target: "ES2020",
    module: "ESNext",
    moduleResolution: "bundler",
    lib: ["ES2020", "DOM", "DOM.Iterable"],
    jsx: "react-jsx",
    strict: true,
    strictNullChecks: true,
    noImplicitAny: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
    resolveJsonModule: true,
    noEmit: true,
    declaration: false,
    declarationMap: false,
    sourceMap: true,
    noUnusedLocals: true,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: true,
    forceConsistentCasingInFileNames: true,
    incremental: false,
    composite: false,
    allowJs: false,
    checkJs: false,
    removeComments: false,
    experimentalDecorators: false,
    paths: false,
    outDir: "",
    rootDir: "",
    include: "src",
    exclude: "node_modules",
  },
  nodejs: {
    target: "ES2022",
    module: "NodeNext",
    moduleResolution: "nodenext",
    lib: ["ES2022"],
    jsx: null,
    strict: true,
    strictNullChecks: true,
    noImplicitAny: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: false,
    skipLibCheck: true,
    resolveJsonModule: true,
    noEmit: false,
    declaration: false,
    declarationMap: false,
    sourceMap: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
    forceConsistentCasingInFileNames: true,
    incremental: false,
    composite: false,
    allowJs: false,
    checkJs: false,
    removeComments: false,
    experimentalDecorators: false,
    paths: false,
    outDir: "dist",
    rootDir: "src",
    include: "src",
    exclude: "node_modules, dist",
  },
  library: {
    target: "ES2020",
    module: "ESNext",
    moduleResolution: "bundler",
    lib: ["ES2020", "DOM"],
    jsx: null,
    strict: true,
    strictNullChecks: true,
    noImplicitAny: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
    resolveJsonModule: true,
    noEmit: false,
    declaration: true,
    declarationMap: true,
    sourceMap: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    noFallthroughCasesInSwitch: true,
    forceConsistentCasingInFileNames: true,
    incremental: false,
    composite: true,
    allowJs: false,
    checkJs: false,
    removeComments: false,
    experimentalDecorators: false,
    paths: false,
    outDir: "dist",
    rootDir: "src",
    include: "src",
    exclude: "node_modules, dist",
  },
  browser: {
    target: "ES2020",
    module: "ESNext",
    moduleResolution: "bundler",
    lib: ["ES2020", "DOM", "DOM.Iterable"],
    jsx: null,
    strict: true,
    strictNullChecks: true,
    noImplicitAny: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
    resolveJsonModule: true,
    noEmit: false,
    declaration: false,
    declarationMap: false,
    sourceMap: true,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: true,
    forceConsistentCasingInFileNames: true,
    incremental: false,
    composite: false,
    allowJs: false,
    checkJs: false,
    removeComments: false,
    experimentalDecorators: false,
    paths: false,
    outDir: "dist",
    rootDir: "src",
    include: "src",
    exclude: "node_modules, dist",
  },
};

const defaultConfig: TsConfig = {
  target: "ES2020",
  module: "ESNext",
  moduleResolution: "bundler",
  lib: ["ES2020", "DOM", "DOM.Iterable"],
  jsx: null,
  strict: true,
  strictNullChecks: true,
  noImplicitAny: true,
  esModuleInterop: true,
  allowSyntheticDefaultImports: true,
  skipLibCheck: true,
  resolveJsonModule: true,
  noEmit: false,
  declaration: false,
  declarationMap: false,
  sourceMap: true,
  noUnusedLocals: false,
  noUnusedParameters: false,
  noFallthroughCasesInSwitch: true,
  forceConsistentCasingInFileNames: true,
  incremental: false,
  composite: false,
  allowJs: false,
  checkJs: false,
  removeComments: false,
  experimentalDecorators: false,
  paths: false,
  outDir: "dist",
  rootDir: "src",
  include: "src",
  exclude: "node_modules",
};

// ---------------------------------------------------------------------------
// JSON builder
// ---------------------------------------------------------------------------

function buildTsconfig(cfg: TsConfig): object {
  const compilerOptions: Record<string, unknown> = {};

  compilerOptions.target = cfg.target;
  compilerOptions.module = cfg.module;
  compilerOptions.moduleResolution = cfg.moduleResolution;

  if (cfg.lib.length > 0) {
    compilerOptions.lib = cfg.lib;
  }

  if (cfg.jsx && cfg.jsx !== "none") {
    compilerOptions.jsx = cfg.jsx;
  }

  if (cfg.strict) {
    compilerOptions.strict = true;
  } else {
    if (cfg.strictNullChecks) compilerOptions.strictNullChecks = true;
    if (cfg.noImplicitAny) compilerOptions.noImplicitAny = true;
  }

  if (cfg.esModuleInterop) compilerOptions.esModuleInterop = true;
  if (cfg.allowSyntheticDefaultImports && !cfg.esModuleInterop) {
    compilerOptions.allowSyntheticDefaultImports = true;
  }
  if (cfg.skipLibCheck) compilerOptions.skipLibCheck = true;
  if (cfg.resolveJsonModule) compilerOptions.resolveJsonModule = true;
  if (cfg.noEmit) compilerOptions.noEmit = true;

  if (!cfg.noEmit && cfg.outDir) compilerOptions.outDir = cfg.outDir;
  if (cfg.rootDir) compilerOptions.rootDir = cfg.rootDir;

  if (cfg.declaration) compilerOptions.declaration = true;
  if (cfg.declarationMap) compilerOptions.declarationMap = true;
  if (cfg.sourceMap) compilerOptions.sourceMap = true;
  if (cfg.noUnusedLocals) compilerOptions.noUnusedLocals = true;
  if (cfg.noUnusedParameters) compilerOptions.noUnusedParameters = true;
  if (cfg.noFallthroughCasesInSwitch) compilerOptions.noFallthroughCasesInSwitch = true;
  if (cfg.forceConsistentCasingInFileNames) compilerOptions.forceConsistentCasingInFileNames = true;
  if (cfg.incremental) compilerOptions.incremental = true;
  if (cfg.composite) compilerOptions.composite = true;
  if (cfg.allowJs) compilerOptions.allowJs = true;
  if (cfg.checkJs && cfg.allowJs) compilerOptions.checkJs = true;
  if (cfg.removeComments) compilerOptions.removeComments = true;
  if (cfg.experimentalDecorators) compilerOptions.experimentalDecorators = true;

  if (cfg.paths) {
    compilerOptions.baseUrl = ".";
    compilerOptions.paths = { "@/*": ["./src/*"] };
  }

  const result: Record<string, unknown> = { compilerOptions };

  const includeList = cfg.include
    ? cfg.include.split(",").map((s) => s.trim()).filter(Boolean)
    : [];
  const excludeList = cfg.exclude
    ? cfg.exclude.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  if (includeList.length > 0) result.include = includeList;
  if (excludeList.length > 0) result.exclude = excludeList;

  return result;
}

// ---------------------------------------------------------------------------
// UI helpers
// ---------------------------------------------------------------------------

function Toggle({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  description?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`w-10 h-5 rounded-full transition-colors ${
            checked ? "bg-brand" : "bg-muted"
          }`}
        />
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </div>
      <div className="min-w-0">
        <span className="text-sm font-medium font-mono">{label}</span>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
    </label>
  );
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium font-mono">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand/50"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium font-mono">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 px-3 rounded-md border border-border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand/50"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const presetLabels: Record<ProjectPreset, string> = {
  nextjs: "Next.js",
  react: "React (Vite)",
  nodejs: "Node.js",
  library: "TS Library",
  browser: "Browser",
};

const libOptions = [
  "ES5", "ES6", "ES2015", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020",
  "ES2021", "ES2022", "ESNext", "DOM", "DOM.Iterable", "DOM.AsyncIterable",
  "WebWorker", "ScriptHost", "esnext.array", "esnext.asynciterable",
  "esnext.intl", "esnext.symbol",
];

export function TsconfigGeneratorTool() {
  const [cfg, setCfg] = useState<TsConfig>({ ...defaultConfig });
  const [activePreset, setActivePreset] = useState<ProjectPreset | null>(null);
  const [copied, setCopied] = useState(false);

  const set = useCallback(<K extends keyof TsConfig>(key: K, value: TsConfig[K]) => {
    setCfg((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  }, []);

  const applyPreset = useCallback((preset: ProjectPreset) => {
    setCfg((prev) => ({ ...prev, ...presets[preset] }));
    setActivePreset(preset);
    ToolEvents.toolUsed("preset-" + preset);
  }, []);

  const reset = useCallback(() => {
    setCfg({ ...defaultConfig });
    setActivePreset(null);
  }, []);

  const tsconfig = useMemo(() => buildTsconfig(cfg), [cfg]);
  const json = useMemo(() => JSON.stringify(tsconfig, null, 2), [tsconfig]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
    ToolEvents.resultCopied();
  }, [json]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tsconfig.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded tsconfig.json!");
    ToolEvents.resultExported("json");
  }, [json]);

  const toggleLib = useCallback((lib: string, checked: boolean) => {
    setCfg((prev) => ({
      ...prev,
      lib: checked ? [...prev.lib, lib] : prev.lib.filter((l) => l !== lib),
    }));
    setActivePreset(null);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Preset buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Start Presets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(presets) as ProjectPreset[]).map((preset) => (
                <button
                  key={preset}
                  onClick={() => applyPreset(preset)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    activePreset === preset
                      ? "bg-brand text-white border-brand shadow-sm shadow-brand/25"
                      : "bg-muted/40 border-border hover:bg-brand/10 hover:border-brand/40"
                  }`}
                >
                  {presetLabels[preset]}
                </button>
              ))}
              <button
                onClick={reset}
                className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground border border-border hover:bg-muted/50 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
            {activePreset && (
              <p className="mt-3 text-xs text-muted-foreground">
                Loaded the{" "}
                <span className="text-brand font-medium">{presetLabels[activePreset]}</span>{" "}
                preset. Customize any option below.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left — options */}
        <div className="space-y-4">
          {/* Target & Module */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  Output Settings
                  <Badge variant="outline" className="text-xs">compilerOptions</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <SelectField
                  label="target"
                  value={cfg.target}
                  options={["ES5", "ES6", "ES2016", "ES2017", "ES2018", "ES2019", "ES2020", "ES2021", "ES2022", "ESNext"]}
                  onChange={(v) => set("target", v)}
                />
                <SelectField
                  label="module"
                  value={cfg.module}
                  options={["CommonJS", "ESNext", "ES2015", "ES2020", "NodeNext", "Node16", "None"]}
                  onChange={(v) => set("module", v)}
                />
                <SelectField
                  label="moduleResolution"
                  value={cfg.moduleResolution}
                  options={["node", "node16", "nodenext", "bundler", "classic"]}
                  onChange={(v) => set("moduleResolution", v)}
                />
                <SelectField
                  label="jsx"
                  value={cfg.jsx ?? "none"}
                  options={["none", "preserve", "react", "react-jsx", "react-jsxdev"]}
                  onChange={(v) =>
                    set("jsx", v === "none" ? null : (v as TsJsx))
                  }
                />
                <TextField
                  label="outDir"
                  value={cfg.outDir}
                  onChange={(v) => set("outDir", v)}
                  placeholder="dist"
                />
                <TextField
                  label="rootDir"
                  value={cfg.rootDir}
                  onChange={(v) => set("rootDir", v)}
                  placeholder="src"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Type checking */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Type Checking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Toggle
                  label="strict"
                  checked={cfg.strict}
                  onChange={(v) => set("strict", v)}
                  description="Enables all strict type-checking flags"
                />
                {!cfg.strict && (
                  <>
                    <Toggle
                      label="strictNullChecks"
                      checked={cfg.strictNullChecks}
                      onChange={(v) => set("strictNullChecks", v)}
                      description="null and undefined are distinct types"
                    />
                    <Toggle
                      label="noImplicitAny"
                      checked={cfg.noImplicitAny}
                      onChange={(v) => set("noImplicitAny", v)}
                      description="Error on implicit any type"
                    />
                  </>
                )}
                <Toggle
                  label="noUnusedLocals"
                  checked={cfg.noUnusedLocals}
                  onChange={(v) => set("noUnusedLocals", v)}
                  description="Error on unused local variables"
                />
                <Toggle
                  label="noUnusedParameters"
                  checked={cfg.noUnusedParameters}
                  onChange={(v) => set("noUnusedParameters", v)}
                  description="Error on unused function parameters"
                />
                <Toggle
                  label="noFallthroughCasesInSwitch"
                  checked={cfg.noFallthroughCasesInSwitch}
                  onChange={(v) => set("noFallthroughCasesInSwitch", v)}
                  description="Error on switch fallthrough"
                />
                <Toggle
                  label="forceConsistentCasingInFileNames"
                  checked={cfg.forceConsistentCasingInFileNames}
                  onChange={(v) => set("forceConsistentCasingInFileNames", v)}
                  description="Disallow case-insensitive file imports"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Emit options */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Emit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Toggle
                  label="noEmit"
                  checked={cfg.noEmit}
                  onChange={(v) => set("noEmit", v)}
                  description="Skip emitting files — type-check only"
                />
                <Toggle
                  label="declaration"
                  checked={cfg.declaration}
                  onChange={(v) => set("declaration", v)}
                  description="Generate .d.ts declaration files"
                />
                <Toggle
                  label="declarationMap"
                  checked={cfg.declarationMap}
                  onChange={(v) => set("declarationMap", v)}
                  description="Generate sourcemaps for .d.ts files"
                />
                <Toggle
                  label="sourceMap"
                  checked={cfg.sourceMap}
                  onChange={(v) => set("sourceMap", v)}
                  description="Generate .js.map source map files"
                />
                <Toggle
                  label="removeComments"
                  checked={cfg.removeComments}
                  onChange={(v) => set("removeComments", v)}
                  description="Strip comments from output"
                />
                <Toggle
                  label="incremental"
                  checked={cfg.incremental}
                  onChange={(v) => set("incremental", v)}
                  description="Save .tsbuildinfo for faster rebuilds"
                />
                <Toggle
                  label="composite"
                  checked={cfg.composite}
                  onChange={(v) => set("composite", v)}
                  description="Enable project references (for monorepos/libraries)"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Interop & extras */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Interop & Extras</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Toggle
                  label="esModuleInterop"
                  checked={cfg.esModuleInterop}
                  onChange={(v) => set("esModuleInterop", v)}
                  description="Enable CommonJS/ES module interop helpers"
                />
                <Toggle
                  label="skipLibCheck"
                  checked={cfg.skipLibCheck}
                  onChange={(v) => set("skipLibCheck", v)}
                  description="Skip type checking of .d.ts files"
                />
                <Toggle
                  label="resolveJsonModule"
                  checked={cfg.resolveJsonModule}
                  onChange={(v) => set("resolveJsonModule", v)}
                  description="Import .json files"
                />
                <Toggle
                  label="allowJs"
                  checked={cfg.allowJs}
                  onChange={(v) => set("allowJs", v)}
                  description="Allow importing JavaScript files"
                />
                {cfg.allowJs && (
                  <Toggle
                    label="checkJs"
                    checked={cfg.checkJs}
                    onChange={(v) => set("checkJs", v)}
                    description="Report errors in .js files"
                  />
                )}
                <Toggle
                  label="experimentalDecorators"
                  checked={cfg.experimentalDecorators}
                  onChange={(v) => set("experimentalDecorators", v)}
                  description="Enable experimental decorator syntax"
                />
                <Toggle
                  label="paths (@ alias)"
                  checked={cfg.paths}
                  onChange={(v) => set("paths", v)}
                  description='Add @/* → ./src/* path alias + baseUrl: "."'
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Include / Exclude */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Include / Exclude</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <TextField
                  label="include (comma-separated)"
                  value={cfg.include}
                  onChange={(v) => set("include", v)}
                  placeholder="src"
                />
                <TextField
                  label="exclude (comma-separated)"
                  value={cfg.exclude}
                  onChange={(v) => set("exclude", v)}
                  placeholder="node_modules"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* lib */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">lib</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {libOptions.map((lib) => (
                    <label
                      key={lib}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="accent-brand w-3.5 h-3.5"
                        checked={cfg.lib.includes(lib)}
                        onChange={(e) => toggleLib(lib, e.target.checked)}
                      />
                      <span className="text-xs font-mono">{lib}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right — live preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:sticky lg:top-24 h-fit"
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-mono">tsconfig.json</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopy}
                    className="gap-1.5 text-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleDownload}
                    className="gap-1.5 text-xs bg-gradient-to-r from-brand to-brand-accent text-white shadow-sm shadow-brand/20"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-muted/50 border-t border-border">
                <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto max-h-[70vh] overflow-y-auto whitespace-pre-wrap break-words">
                  <code>{json}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <p className="mt-3 text-xs text-muted-foreground text-center">
            Config updates live as you change options.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
