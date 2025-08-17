export function safeFunc(context) {
    return context.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
