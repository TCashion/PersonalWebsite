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
                                    <a href="../index.html">Home</a>
                                </div>
                                <div class="col">
                                    <a href="portfolio.html">Portfolio</a>
                                </div>
                                <div class="col">
                                    <a href="blog.html">Blog</a>
                                </div>
                                <!-- COMMENTED OUT UNTIL READY
                                 <div class="col">
                                    <a href="gallery.html">Gallery</a>
                                </div> -->
                                <div class="col">
                                    <a href="about.html">About</a>
                                </div>
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
                            <div>
                                <img id="srcbutton" src="../images/SearchIcon.PNG">
                            </div>
                        </div>
                        <nav>
                            <div class="row" id="nav-links">
                                <div class="col">
                                    <a href="../index.html">Home</a>
                                </div>
                                <div class="col">
                                    <a href="../portfolio.html">Portfolio</a>
                                </div>
                                <div class="col">
                                    <a href="../blog.html">Blog</a>
                                </div>
                                <!-- COMMENTED OUT UNTIL READY
                                 <div class="col">
                                    <a href="../gallery.html">Gallery</a>
                                </div> -->
                                <div class="col">
                                    <a href="../about.html">About</a>
                                </div>
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

    $("#footerDiv").append(footerTemplate);
    $("#footerDiv-nested").append(footerTemplateNested);
    // *********** END FOOTER *************
    // ************************************

    $("#email-capture").on("submit", function(event) {
        event.preventDefault();
        
    });



});