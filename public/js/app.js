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
});