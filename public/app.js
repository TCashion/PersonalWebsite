var filterSelected = [];

$(document).ready(function() {

    // ************************************
    // *********** HEADER *****************

    // Inserts header template on every page. Allows for easy editing of header on all pages.
    // Edit header here: 
    var headerTemplate = `
        <header>        
            <div class="container">
                <div class="row">
                    <div class="col col-12" >
                        <div class="row">
                            <div id="nameBanner" class="col col-12">
                                <h1>Travis G. Cashion</h1>
                            </div>
                            <!-- commented out until functionality is built -->
                            <!--
                            <div>
                                <img id="srcbutton" src="images/SearchIcon.PNG">
                            </div>
                            -->
                        </div>
                        <nav>
                            <div class="row" id="nav-links">
                                <ul>
                                    <li class="nav-li">
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li class="nav-li vert-divider">
                                        |   
                                    </li>
                                    <li class="nav-li">
                                        <a href="portfolio.html">Portfolio</a>
                                    </li>
                                    <li class="nav-li vert-divider">
                                        |   
                                    </li>
                                    <li class="nav-li">
                                        <a href="blog.html">Blog</a>
                                    </li>
                                    <li class="nav-li vert-divider">
                                        |   
                                    </li>
                                    <!-- COMMENTED OUT UNTIL READY
                                    <li class="nav-li">
                                        <a href="gallery.html">Gallery</a>
                                    </li> -->
                                    <li class="nav-li">
                                        <a href="about.html">About</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    `;

    var headerTemplateNested = `
        <header>        
            <div class="container">
                <div class="row">
                    <div class="col col-12" >
                        <div class="row">
                            <div id="nameBanner" class="col col-12">
                                <h1>Travis G. Cashion</h1>
                            </div>
                            <!-- commented out until functionality is built -->
                            <!--
                            <div>
                                <img id="srcbutton" src="images/SearchIcon.PNG">
                            </div>
                            -->
                        </div>
                        <nav>
                            <div class="row" id="nav-links">
                                <ul>
                                    <li class="nav-li">
                                        <a href="../index.html">Home</a>
                                    </li>
                                    <li class="nav-li vert-divider">
                                        |   
                                    </li>
                                    <li class="nav-li">
                                        <a href="../portfolio.html">Portfolio</a>
                                    </li>
                                    <li class="nav-li vert-divider">
                                        |   
                                    </li>
                                    <li class="nav-li">
                                        <a href="../blog.html">Blog</a>
                                    </li>
                                    <li class="nav-li vert-divider">
                                        |   
                                    </li>
                                    <!-- COMMENTED OUT UNTIL READY
                                    <li class="nav-li">
                                        <a href="../gallery.html">Gallery</a>
                                    </li> -->
                                    <li class="nav-li">
                                        <a href="../about.html">About</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    `;

    $("#headerDiv").append(headerTemplate);
    $("#headerDiv-nested").append(headerTemplateNested);
    // *********** END HEADER *************
    // ************************************

    
    // ************************************
    // *********** FOOTER *****************
    var footerTemplate = `
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col col-4">
                        <h1>Travis G. Cashion</h1>
                    </div>
                    <div class="col col-4">
                        &copy; 2020
                        <p>Web design & formatting by Travis Cashion</p>
                    </div>
                    <div class="col col-4 social" >
                        <!-- How do I get this to send to gmail?
                        <img class="socialimgs" src="images/email.png">
                        https://-->
                        <a href="https://www.linkedin.com/in/traviscashion/">
                            <img class="socialimgs" src="images/linkedin.png">
                        </a>
                        <a href="https://www.instagram.com/travis.cashion/">
                            <img class="socialimgs" src="images/instagram.png">
                        </a>
                        <a href="https://medium.com/@cashion.travisg">
                            <img class="socialimgs" src="images/medium.png">
                        </a>
                        <a href="https://www.facebook.com/travcashion">
                            <img class="socialimgs" src="images/facebook.png">
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    var footerTemplateNested = `
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col col-4">
                        <h1>Travis G. Cashion</h1>
                    </div>
                    <div class="col col-4">
                        &copy; 2020
                        <p>Web design & formatting by Travis Cashion</p>
                    </div>
                    <div class="col col-4 social" >
                        <!-- How do I get this to send to gmail?
                        <img class="socialimgs" src="images/email.png">
                        https://-->
                        <a href="https://www.linkedin.com/in/traviscashion/">
                            <img class="socialimgs" src="../images/linkedin.png">
                        </a>
                        <a href="https://www.instagram.com/travis.cashion/">
                            <img class="socialimgs" src="../images/instagram.png">
                        </a>
                        <a href="https://medium.com/@cashion.travisg">
                            <img class="socialimgs" src="../images/medium.png">
                        </a>
                        <a href="https://www.facebook.com/travcashion">
                            <img class="socialimgs" src="../images/facebook.png">
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    `;

    $("#footerDiv").append(footerTemplate);
    $("#footerDiv-nested").append(footerTemplateNested);
    // *********** END FOOTER *************
    // ************************************


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
    $(".blog-preview:odd .col-4:first-child").addClass("hidden");
    $(".blog-preview:even .col-4:last-child").addClass("hidden");

    // filter function: manages a filter array, compares .blog-preview divs to selections, displays or hides accordingly 
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

        // updates the filter classes based on selections 
        if (filterSelected.length === 0) {
            $(".blog-preview").each( function () {
                    $(this).removeClass("hidden");
            });
        } else {
            $(".blog-preview").addClass("hidden");
            for ( i = 0; i < filterSelected.length; i++) {
                $(".blog-preview").each( function () { 
                    if ( $(this).hasClass(`${filterSelected[i]}`) ) {
                        $(this).removeClass("hidden");
                    }; 
                });
            };
        };
    });
});