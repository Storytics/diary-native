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
    <div id="textEditor" contenteditable="${contentEditable}" spellcheck="false">${data}</div>
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
</script>

</html>`;

export default Page;
