$(document).ready(function() {

    console.log("SANITY CHECK");


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
                            <div>
                                <img id="srcbutton" src="images/SearchIcon.PNG">
                            </div>
                        </div>
                        <nav>
                            <div class="row" id="nav-links">
                                <div class="col">
                                    <a href="../PersonalWebsite/index.html">Home</a>
                                </div>
                                <div class="col">
                                    <a href="../PersonalWebsite/portfolio.html">Portfolio</a>
                                </div>
                                <div class="col">
                                    <a href="../PersonalWebsite/blog.html">Blog</a>
                                </div>
                                <!-- COMMENTED OUT UNTIL READY
                                 <div class="col">
                                    <a href="../PersonalWebsite/gallery.html">Gallery</a>
                                </div> -->
                                <div class="col">
                                    <a href="../PersonalWebsite/about.html">About</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    `;

    $("#headerDiv").append(headerTemplate);
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
                        <img class="socialimgs" src="images/email.png">
                        <img class="socialimgs" src="images/instagram.png">
                        <img class="socialimgs" src="images/medium.png">
                        <img class="socialimgs" src="images/facebook.png">
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    $("#footerDiv").append(footerTemplate);
    // *********** END FOOTER *************
    // ************************************

    $("#email-capture").on("submit", function(event) {
        event.preventDefault();
        
    });



});