// Requires jquery and bootstrap

$(document).ready(function (){

    var selection = null;

    function updateInput() {
        console.log($(this).html());
        $('#wys-value').val($('#wys-editor').html());
    }

    function toggleTag(element) {
        if (selection) {
            var range = selection.getRangeAt(0);
            var text = selection.toString();
            var par = selection.anchorNode.parentNode
            var parentName = par.tagName;
            console.log(parentName);
            if (parentName.toLowerCase() == element) {
                $(par).detach();
                range.insertNode(document.createTextNode(text));
                return;
            } else if (par.parentNode.tagName.toLowerCase() == element) {
                console.log(par.parentNode.tagName);
                console.log(par.parentNode.parentNode.tagName);
                par.parentNode.parentNode.replaceChild(par, par.parentNode);
                return;
            }
            range.deleteContents();
            console.log(selection);
            var strong = document.createElement(element);
            range.insertNode(strong);
            strong.appendChild(document.createTextNode(text));
        }
    }

    $('#wys-editor').keyup(function(){
        updateInput();
    });


    $(window).mouseup(function(){
        if (window.getSelection && window.getSelection().rangeCount != 0) {
            text = window.getSelection().toString();
            if (text == '') {
                selection = null;
                return;
            }
            selection = window.getSelection();
            console.log(text);
        } else {
            selection = null;
        }
    });

 

    $('#wys-bold').click(function(){toggleTag('strong')});
    $('#wys-em').click(function(){toggleTag('em')});
    $('#wys-h1').click(function(e){ e.preventDefault(); toggleTag('h1') });
    $('#wys-h2').click(function(e){ e.preventDefault(); toggleTag('h2') });
    $('#wys-h3').click(function(e){ e.preventDefault(); toggleTag('h3') });
    $('#wys-h4').click(function(e){ e.preventDefault(); toggleTag('h4') });
    $('#wys-h5').click(function(e){ e.preventDefault(); toggleTag('h5') });
    $('#wys-h6').click(function(e){ e.preventDefault(); toggleTag('h6') });

    $('#wys-align-left').click(function(){
    });

    $('#wys-submit').click(function() {
        updateInput();
    });

    var socket = io();
    var editor = document.getElementById('wys-editor');
    $('#wys-editor').keyup(function(e){
        socket.emit('key', e.keyCode);
//        socket.emit('cursor', window.getSelection());
    });

});

