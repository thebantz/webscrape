let htmlString = `<!DOCTYPE html>
<html lang="en">

<head>
</head>

<body>
  <!-- 	Data we want to scrape starts here -->
  <div class="list items">
    <div class="item">
      <div class="header">
        <h1 itemprop="name"> <a href="/comp/tessera">Tessera </a> </h1>
        <p rel="description"> Proud of our wide range of product
          we developped many project in the past 4 years. <br><br> You can find the company
          in 14 different countries
        <p></p> in the world. <br>
        Blablabla. <br>
        </p>
      </div>
      <div class="contact">
        <span itemprop="employeeName"> Mike Layn </span> <br>
        <span itemprop="employeeJobTitle"> Marketing Assistant</span> <br>
        <span itemprop="telephone"> Phone: (841) 467-168 </span> <br>
        <span itemprop="email"> Email: mike.layn@tessera.io</span> <br>
      </div>
    </div>
    <div class="item">
      <div class="header">
        <h1 itemprop="name"> <a href="/comp/marcox"> Marcox </a> </h1>
        <p rel="description"> Lorem ipsum dolor
        <p></p> sit amet, consectetur adipisicing elit. Cupid
        in any actions we <br> take in the world. <br> <br>
        </p>
      </div>
      <div class="contact">
        <span itemprop="employeeName"> Jake Kannegan </span> <br>
        <span itemprop="employeeJobTitle"> Owner </span> <br>
        <span itemprop="telephone"> Phone: +1497 467168 </span> <br>
        <span itemprop="email"> Email: jakek@marcox.com</span> <br>
      </div>
    </div>
  </div>
  <!-- 	Data we want to scrape ends here -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="./js/script.js"></script>
</body>

</html>`
let cheerio = require('cheerio');
let jsonframe = require('jsonframe-cheerio');

let $ = cheerio.load(html);
jsonframe($); // initializes the plugin

var frame = {
	"companies": {           // setting the parent item as "companies"
		"selector": ".item",    // defines the elements to search for
		"data": [{              // "data": [{}] defines a list of items
			"name": ".header [itemprop=name]",          // inline selector defining "name" so "company"."name"
			"description": ".header [rel=description]", // inline selector defining "description" as "company"."description"
			"url": {                                    // defining "url" by an attribute with "attr" and "selector" in an object
				"selector": ".header [itemprop=name]",      // is actually the same as the inline selector
				"attr": "href"                              // the attribute name to retrieve
			},
			"contact": {                                // set up a parent "contact" element as "company"."contact"
				"selector": ".contact",                 // defines the element to search for
				"data": {                               // defines the data which "contact" will contain
					"telephone": {                          // using "type" to use "telephone" parser to extract only the telephone
						"selector": "[itemprop=telephone]",     // simple selector for "telephone"                
						"type": "telephone"                     // using "telephone" plugin parser
					},
					"employee": {                           // setting a parent node "employee" as "company"."contact"."employee"
						"name": "[itemprop=employeeName]",          // inline selector defining "name"
						"jobTitle": "[itemprop=employeeJobTitle]",  // inline selector defining "jobtitle"
						"email": {                          // using "type" to use "email" parser to extract only the email
							"selector": "[itemprop=email]",     // simple selector for "email"
							"type": "email"                     // using "email" plugin parser
						}
					}
				}
			}
		}]
	}

};

var companiesList = $('.list.items').scrape(frame);
console.log(companiesList); // Output the data in the terminal