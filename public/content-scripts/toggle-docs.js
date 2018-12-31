console.log('docsIframe.style.display before:', document.getElementById('help-docs').style.display);
if (document.getElementById('help-docs').style.display === "none") {
    document.getElementById('help-docs').style.display = "block";
} else {
    document.getElementById('help-docs').style.display = "none";
}
console.log('docsIframe.style.display after:', document.getElementById('help-docs').style.display);
