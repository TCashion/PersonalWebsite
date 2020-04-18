document.addEventListener("DOMContentLoaded", function() {

    // email capture on home/index page
    $("#email-capture").on("submit", function(event) {
        event.preventDefault();
        var email = $("#email-input").val();
        db.collection("email-capture").add({
            email: email
        });
        $("#email-input").val("");
    });

    // alternate photo side on preview
    function alternatePreviewPhoto() {
        $(".blog-preview:odd .col-4:first-child").addClass("hidden");
        $(".blog-preview:even .col-4:last-child").addClass("hidden");
    };
    alternatePreviewPhoto();
    

    // filter function: manages a filter array, compares .blog-preview divs to selections, displays or hides accordingly 
    var filterSelected = [];
    
    $("#filter-form").on("click", function () {
        var addFilter;
        var removerFilter;

        // manage filter array: 
        $("input:checkbox").each( function() {  
            var $this = $(this);
            if ( $this.prop("checked") === true ) {
                addFilter = $this.attr("id");
                if ( filterSelected.includes(addFilter) === false) {
                    filterSelected.push(addFilter);
                };
            } else if ( $this.prop("checked") === false ) {
                var removeFilter = $this.attr("id");
                for ( i = 0; i < filterSelected.length ; i++ ) {
                    if ( filterSelected[i] === removeFilter ) {
                        filterSelected.splice(i, 1);
                    };
                };
            }; 
        });

        // alternates photos of only filtered elements
        function alternateFilteredPhoto() {
            $(".blog-preview").each( function () {
                if ( $(this).hasClass("alternate-photo") ) {
                    let child = $(this).children().children(".col-4");
                    child.first().removeClass("hidden");
                    child.last().addClass("hidden");
                }
            })
        };


        // updates the filter classes based on selections:
        // first part of IF statement accounts for no selections 
        if (filterSelected.length === 0) {
            $(".blog-preview").each( function () {
                    // remove "atlernate-photo" and "hidden" class from all divs
                    $(this).removeClass("hidden");
                    $(this).removeClass("sm-hidden"); 
                    $(this).removeClass("alternate-photo");
                    let child = $(this).children().children(".col-4")
                    child.removeClass("hidden"); 
                    // call function to redistribute classes according to no selection
                    alternatePreviewPhoto();
            });
        // next part accounts for selections made
        } else {
            // add hidden and sm-hidden (for media queries) classes to all previews, to be removed afterward based on selections
            $(".blog-preview").addClass("hidden");
            $(".blog-preview").addClass("sm-hidden");
                // Add hidden class to all col-4 photos
            for ( i = 0; i < filterSelected.length; i++) {
                $(".blog-preview").each( function () { 
                    if ( $(this).hasClass(`${filterSelected[i]}`) ) {
                        $(this).removeClass("hidden");
                        $(this).removeClass("sm-hidden");
                        // for non-hidden divs, alternate photos. add another class "alternate-photo"
                        $(this).addClass("alternate-photo");
                        // call function to redistribute classes according to filter selection
                        alternateFilteredPhoto();
                    }; 
                });
            };
        };
    });


    // **************
    // GAMEBOARD CODE
    // **************

    var userTurn = 0;
    var panels = document.querySelectorAll(".panel");
    var playerDisplay = document.querySelector("#player");
    var matrix = ["","","","","","","","",""];

    // change color for winner
    var winnerColors = (...indexes) => {
        var winner = [...indexes];
        for (let j = 0; j < winner.length; j++) {
            panels[winner[j]].classList += " winner-colors";
        };
    };


    // determine winner
    var determineWinner = () => {
        if(matrix[0] !== "" && matrix[0] === matrix[1] && matrix[1] === matrix[2]) {
            winnerColors(0,1,2);
        } else if (matrix[3] !== "" && matrix[3] === matrix[4] && matrix[4] === matrix[5]) {
            winnerColors(3,4,5);
        } else if (matrix[6] !== "" && matrix[6] === matrix[7] && matrix[7] === matrix[8]) {
            winnerColors(6,7,8);
        } else if (matrix[0] !== "" && matrix[0] === matrix[4] && matrix[4] === matrix[8]) {
            winnerColors(0,4,8);
        } else if (matrix[2] !== "" && matrix[2] === matrix[4] && matrix[4] === matrix[6]) {
            winnerColors(2,4,6);
        } else if (matrix[0] !== "" && matrix[0] === matrix[3] && matrix[3] === matrix[6]) {
            winnerColors(0,3,6);
        } else if (matrix[1] !== "" && matrix[1] === matrix[4] && matrix[4] === matrix[7]) {
            winnerColors(1,4,7);
        } else if (matrix[2] !== "" && matrix[2] === matrix[5] && matrix[5] === matrix[8]) {
            winnerColors(2,5,8);
        };
    };
    
    // add X or O based on user selection
    for (let i =0; i < panels.length; i++) {
        panels[i].addEventListener("click", () => {
            if (userTurn % 2 === 0 && panels[i].innerHTML === "") {
                panels[i].innerHTML = "X";
                panels[i].classList += " X";
                userTurn += 1;
                playerDisplay.innerHTML = "Player 2 (O)";
                matrix[i] = panels[i].innerHTML;
                determineWinner(); 
            } else if (userTurn %2 === 1 && panels[i].innerHTML === "") {
                panels[i].innerHTML = "O";
                panels[i].classList += " O";
                userTurn += 1;
                playerDisplay.innerHTML = "Player 1 (X)";
                matrix[i] = panels[i].innerHTML;
                determineWinner(); 
            };
        });
    };

    // **************
    // END GAMEBOARD CODE
    // **************
});