const vscode = require('vscode');

function activate(context) {
  const provider = vscode.languages.registerCompletionItemProvider('lua', {
    provideCompletionItems(document, position) {
      const config = vscode.workspace.getConfiguration('fxmanifest-generator');
      const author = config.get('author') || '';
      const game = config.get('game') || 'gta5';
      const version = config.get('version') || '1.0.0';

      const item = new vscode.CompletionItem('fxgen', vscode.CompletionItemKind.Snippet);
      item.detail = 'Insert fxmanifest.lua';
      item.insertText = new vscode.SnippetString(
        `fx_version 'cerulan'\nauthor '${author}'\ngame '${game}'\nlua54 'yes'\n\ndescription ''\nversion '${version}'\n\nclient_script {\n\n}\n \nshared_script {\n\n\n} \nserver_script {\n\n}`
      );
      item.documentation = new vscode.MarkdownString(
    `\`\`\`lua
fx_version 'cerulan'
author ''
game 'gta5'
lua54 'yes'

description ''
version '1.0.0'

client_script {

}

shared_script {

}

server_script {

}`
      );
      return [item];
    }
  }, 'f');

  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
