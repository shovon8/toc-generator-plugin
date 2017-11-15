window.addEventListener('load', initTocGenerator, false);

function initTocGenerator() {
    // change it to the tag that you use for your headers
    // I am using <h2> tags for the demo
    var headerTag = 'h2';

    addStylesheet();
    initTocList();
    populateTocList();
    initToggler();

    function addStylesheet() {
        var cssStyleCode = '#container-toc{width:448px;display:block;background-color:#edf6ff;border:1px solid #aaa;padding:10px 20px;font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif}#toc_list{margin:15px 0 0}.toc_list_show{overflow-y:visible}.toc_list_hide{overflow-y:hidden}#container-toc a{color:maroon;text-decoration:none}#container-toc a:hover{color:#337ab7;text-decoration:underline}#container-toc .toc_title{display:block;text-align:center;font-weight:700;margin:0;padding:0}#container-toc a h2,#container-toc a h3,.toc_title{font-weight:700;font-size:15.2px;margin:0;line-height:22.8px}#container-toc a h3{display:block;margin-left:34px}#toc_hide_btn:hover,#toc_hide_btn:active{text-decoration:underline;cursor:pointer}';

        var styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        styleElement.appendChild(document.createTextNode(cssStyleCode));
        document.body.appendChild(styleElement);
    }

    function initTocList() {
        var obj = document.getElementById('container-toc');

        // init other elements in the obj
        var tmpHeader = document.createElement(headerTag);
        tmpHeader.setAttribute('class', 'toc_title');
        tmpHeader.appendChild(document.createTextNode('Table of Contents '));
        var tmpSpanButton = document.createElement('span');
        tmpSpanButton.setAttribute('id', 'toc_hide_btn');
        tmpSpanButton.appendChild(document.createTextNode('[Hide]'));
        tmpHeader.appendChild(tmpSpanButton);
        obj.appendChild(tmpHeader);

        var tmpDiv = document.createElement('div');
        tmpDiv.setAttribute('id', 'toc_list');
        tmpDiv.setAttribute('class', 'toc_list_show');
        obj.appendChild(tmpDiv);
    }

    function createTocHeaderElement(elementToAppend, link, content) {
        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#' + link);

        var header = document.createElement(headerTag);
        header.appendChild(document.createTextNode(content));

        linkElement.appendChild(header);

        elementToAppend.appendChild(linkElement);
    }

    function populateTocList() {
        var tocListObj = document.getElementById('toc_list');

        var levelTwoHeading = document.getElementsByTagName(headerTag);

        var headers = [];

        for(var i = 0; i < levelTwoHeading.length; i++) {
            var elementId = levelTwoHeading[i].getAttribute('id');
            var elementText = levelTwoHeading[i].textContent;

            if(elementId !== null) {
                headers.push({id: elementId, text: elementText});
            }
        }

        for(var i = 0; i < headers.length; i++) {
            createTocHeaderElement(tocListObj, headers[i].id, headers[i].text);
        }
    }

    function initToggler() {
        document.getElementById('toc_hide_btn').onclick = function(e) {
            var tocList = document.getElementById('toc_list');
            var className = tocList.getAttribute('class');
            var animationRate = 5;

            var clickedElement = e.currentTarget;
            
            if(className === 'toc_list_show') {
                tocList.setAttribute('class', 'toc_list_hide');
                tocList.setAttribute('_content_height', tocList.clientHeight.toString());
                var height = tocList.clientHeight - animationRate;
                var animationIntervalObj = window.setInterval(function() {
                    if(height < 0) {
                        window.clearInterval(animationIntervalObj);
                        tocList.style.display = 'none';
                        clickedElement.innerText = "[Show]";
                        return;
                    }

                    tocList.style.height = height + 'px';
                    height -= animationRate;
                }, 1);
            } else {
                tocList.style.display = 'block';

                var maxHeight = parseInt(tocList.getAttribute('_content_height'));
                var height = animationRate;
                

                var animationIntervalObj = window.setInterval(function() {
                    if(height >= maxHeight) {
                        tocList.style.height = maxHeight + 'px';
                        window.clearInterval(animationIntervalObj);
                        tocList.setAttribute('class', 'toc_list_show');
                        clickedElement.innerText = "[Hide]";
                        return;
                    }

                    tocList.style.height = height + 'px';
                    height += animationRate;
                }, 1);
            }
        }
    }
}