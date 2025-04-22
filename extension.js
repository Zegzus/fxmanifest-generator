const vscode = require('vscode');

function activate(context) {
  const provider = vscode.languages.registerCompletionItemProvider('lua', {
    provideCompletionItems(document, position) {
      const config = vscode.workspace.getConfiguration('fxmanifest-generator');
      const fx_version = config.get('fx_version') || 'cerulean';
      const author = config.get('author') || '';
      const escrow_ignore = config.get('escrow_ignore') || false;
      const game = config.get('game') || 'gta5';
      const import_ox = config.get('import_ox') || false;
      const version = config.get('version') || '1.0.0';


      const item = new vscode.CompletionItem('fxgen', vscode.CompletionItemKind.Snippet);
      item.detail = 'Insert fxmanifest.lua';
      if (escrow_ignore && import_ox) {
        item.insertText = new vscode.SnippetString(
          `fx_version '${fx_version}'\nauthor '${author}'\ngame '${game}'\nlua54 'yes'\n\ndescription ''\nversion '${version}'\n\nescrow_ignored {\n\n}\n\nclient_script {\n\n}\n\nshared_script {\n'@ox_lib/init.lua',\n}\n\nserver_script {\n\n}`
        );
      }
      else if (import_ox) {
        item.insertText = new vscode.SnippetString(
          `fx_version '${fx_version}'\nauthor '${author}'\ngame '${game}'\nlua54 'yes'\n\ndescription ''\nversion '${version}'\n\nclient_script {\n\n}\n\nshared_script {\n'@ox_lib/init.lua',\n}\n\nserver_script {\n\n}`
        );
      }
      else if (escrow_ignore) {
        item.insertText = new vscode.SnippetString(
          `fx_version '${fx_version}'\nauthor '${author}'\ngame '${game}'\nlua54 'yes'\n\ndescription ''\nversion '${version}'\n\nescrow_ignored {\n\n}\n\nclient_script {\n\n}\n\nshared_script {\n\n}\n\nserver_script {\n\n}`
        );
      }
      else {
        item.insertText = new vscode.SnippetString(
          `fx_version '${fx_version}'\nauthor '${author}'\ngame '${game}'\nlua54 'yes'\n\ndescription ''\nversion '${version}'\n\nclient_script {\n\n}\n\nshared_script {\n\n}\n\nserver_script {\n\n}`
        );
      }
      item.documentation = new vscode.MarkdownString(
    `\`\`\`lua
fx_version 'cerulean'
author ''
game 'gta5'
lua54 'yes'

description ''
version '1.0.0'

escrow_ignore { 
  
}

client_script {

}

shared_script {
  '@ox_lib/init.lua',
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
