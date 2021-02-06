interface Props {
  data: string;
  contentEditable: string;
}

const Page = ({
  data = "",
  contentEditable = "true",
}: Props): string => `<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable: 1.0, minimum-scale: 0.8, maximum-scale: 2.0" />
    <style>
        * {
            outline: none;
        }
    </style>
</head>

<body>
    <div id="textEditor" contenteditable="${contentEditable}" onmouseup="handleSelection()" spellcheck="false" autocomplete="off">${data}</div>
</body>

<script>
    const observer = new MutationObserver(mutations => {
        window.ReactNativeWebView.postMessage(textEditor.innerHTML)
    })
    observer.observe(textEditor, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
    })
    function handleSelection(){
        var sel = window.getSelection ? window.getSelection() : document.selection.createRange();
        var output = sel;  

        if (sel.anchorNode && (sel.anchorNode == sel.extentNode)) {
            if (sel.toString() == sel.anchorNode.textContent) {
                output = sel.anchorNode.parentElement.outerHTML;
            }
        }

        if(window.getSelection().toString()){
            setTimeout(function () {
                window.ReactNativeWebView.postMessage("//isSelection://" + output);
            }, 0);
        }
    }
</script>

</html>`;

export default Page;
