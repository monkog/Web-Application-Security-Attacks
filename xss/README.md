# Cross Site Scripting (XSS)

Cross-Site scripting attacks are based on injecting malicious code into the website. The code can often access and manipulate cookies, session tockens and other sensitive information kept by the browser. Most often it's injected as JavaScript through HTML elements, such as text boxes.

## Example

1. Open a command line in the *xss* folder and run ```npm run start```
2. Open a web browser and navigate to http://localhost:7000/
3. Enter ```<img src="" onerror="alert(1)"></img>``` in the textbox area and click **Add Comment**
4. Observe that an alert box is displayed, triggered by the onerror event

## How to defend

### Content-Security-Policy

One of the examples of how to make our application resistant to such attack is to allow on our website only the content that comes from trusted domains. There are libraries that take care of this for us. One of them is [**helmet**](https://github.com/helmetjs/helmet)

Helmet has a feature called **contentSecurityPolicy** which helps to prevent from the unwanted content being injected into the web page. This feature sets the **Content-Security-Policy** header in the web request. This header is a whitelist for the content that is allowed to be on the website.

In this example we want to prevent any content that does not come from our domain. Therefore the content security policy needs to allow only the content from the same domain that the application server works on. The following code needs to be added before starting the server of our application:

```javascript
const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'"]
    }
}));
```

The ```defaultSrc: ["'self'"]``` allows to load external resources only if they are from the same domain as the server. The ```styleSrc: ["'self'"]``` does the same but for style sheets.

### Sanitize

The other way is to sanitize the content that is sent by the user. There are libraries that take care of this for us. One of them is [**sanitize**](https://github.com/apostrophecms/sanitize-html). This library sanitized any HTML content that is provided. It allows you to specify the tags and their attributes that you want to permit.

In order to use the library, add the following code:

```javascript
const sanitize = require('sanitize-html');
```

You can set the allowed set of tags and attributes as shown in the example below:

```javascript
const whitelist = {
    allowedTags: [ 'i', 'em', 'strong', 'a' ],
    allowedAttributes: {
        'a': [ 'href' ]
    },
    allowedIframeHostnames: ['www.youtube.com']
};
```

Then when processing user's input the value needs to be processed by the sanitize library as shown below:

```javascript
const sanitizedContent = sanitize(content, whitelist);
```

Sanitize will remove tags and attributes if they are not on the whitelist. Examples of the sanitization using the whitelist defined above:

|**Original**|**Sanitized**|
|------------|-------------|
|```<b>bold</b>```|bold|
|```<a href='#'>link</a>```|```<a href="#">link</a>```|
|```<a href='#' id='some-id'>link</a>```|```<a href="#">link</a>```|

[Go to top](#cross-site-scripting-xss)  
[Back](../README.md)
