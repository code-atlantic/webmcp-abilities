/**
 * WebMCP type declarations for document.modelContext, its deprecated navigator
 * predecessor, and the plugin globals.
 */

interface McpResult {
	content: Array< { type: string; text: string } >;
}

interface ToolAnnotations {
	readOnlyHint?: boolean;
	[ key: string ]: unknown;
}

interface McpTool {
	name: string;
	description: string;
	inputSchema: Record< string, unknown >;
	annotations?: ToolAnnotations;
	execute: ( input: Record< string, unknown > ) => Promise< McpResult >;
}

interface ProvideContextOptions {
	tools: McpTool[];
}

interface ModelContext {
	provideContext( context: ProvideContextOptions ): void;
	registerTool( tool: McpTool ): void;
}

interface WmcpBridgeConfig {
	toolsEndpoint: string;
	executeEndpoint: string;
	nonceEndpoint: string;
	nonce: string;
}

/**
 * The spec moved this surface from navigator to document on 21 July 2026, and
 * Chromium has since removed the navigator one. document is where it lives now;
 * navigator stays declared, and optional, because the origin trial still serves
 * it to builds that predate the move. Both are optional so the runtime feature
 * test in webmcp-abilities.ts stays honest rather than being typed away.
 */
interface Document {
	modelContext?: ModelContext;
}

interface Navigator {
	/** @deprecated Removed in Chromium. Use document.modelContext. */
	modelContext?: ModelContext;
}

// eslint-disable-next-line no-var
declare var wmcpBridge: WmcpBridgeConfig | undefined;
