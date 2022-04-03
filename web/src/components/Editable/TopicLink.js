// Custom TinyMCE plugin stolen from the angular repo
// Probably going to translate it into react if it's of use

// tinymce.PluginManager.add('topicLink', function(editor, url) {
//     editor.on('NodeChange', e => {
//         const node = editor.selection.getNode();
//         if (node.classList.contains('customTopicLink')) {
//         }
//     });

//     editor.addButton('topicLink', {
//         text: 'Page',
//         icon: 'mce-ico mce-i-link',
//         onclick: function() {
//             const node = editor.selection.getNode();
//             let nodeValue = null;
//             let nodeText = '';
//             let isTopicNode = false;
//             if (node.classList.contains('customTopicLink')) {
//                 isTopicNode = true;
//                 nodeValue = node.dataset.topicval || null;
//                 nodeText = node.innerText;
//             }
//             const selection = editor.selection.getContent() || '';
//             const options = [
//                 { value: null, text: 'Choose a Page' },
//                 ...editor['availableTopics'].map(a => {
//                     return {
//                         value: a['id'],
//                         text: a.getName()
//                     };
//                 })
//             ];
//             editor.windowManager.open({
//                 title: 'Link to a Page',
//                 body: [
//                     {
//                         type: 'listbox',
//                         name: 'topic',
//                         label: 'Page to link',
//                         values: options,
//                         value: isTopicNode ? nodeValue : null
//                     },
//                     {
//                         type: 'textbox',
//                         name: 'text',
//                         label: 'Text to display',
//                         value: isTopicNode ? nodeText : selection
//                     }
//                 ],
//                 onsubmit: function(e) {
//                     const topicVal = e.data.topic;
//                     const linkText = e.data.text;
//                     if (!topicVal || !linkText) {
//                         e.preventDefault();
//                         editor.windowManager.alert('Invalid input!');
//                     } else {
//                         const value = `<a href="${window.location.origin}/topic/${topicVal}"
//                             style="text-decoration: underline; color: blue; cursor: pointer;"
//                             class="customTopicLink"
//                             data-topicval="${topicVal}"
//                         >${linkText}</span>`;
//                         if (isTopicNode) {
//                             editor.selection.getNode().remove();
//                             editor.insertContent(value);
//                         } else if (selection) {
//                             editor.selection.setContent(value);
//                         } else {
//                             editor.insertContent(value);
//                         }
//                     }
//                 }
//             });
//         }
//     });

//     return {
//         getMetadata: function() {
//             return {
//                 name: 'Page Link Plugin',
//                 url: 'https://riafox.com'
//             };
//         }
//     };
// });
