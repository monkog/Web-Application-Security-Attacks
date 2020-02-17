# Tabnabbing

Tabnabbing is an attack that happens during a redirection to a hacker's site. When a link to the infected page is being clicked, the target page opend in a new tab. Behind the hood it also redirects the original site to some other malicious site that the user is not expecting to be redirected to. It is especially dangerous in a situation, when the substituted page looks exactly like the original actions. This may result in action being performed on the phishing site, when at the same time the user is certain, he is performing them on the original one.

## How does it work

When the user clicks a link on the vulnerable page, it opens the link in a new tab. The application that is being opened in the new tab has access to the ```window.opener``` object. This property returns a reference to the origin window. Overwriting the ```window.opener.location``` property results in the original page being redirected to a new site.

## Example

1. Open the ```index.html``` file from the *vulnerable-app* folder
2. Click the **Kittens** link or the **Puppies!** button
3. Observe that the **Attacker main app** is opened in a new tab
4. Go back to the original site and observe, that you have been redirected to the **Attacker redirect app**

## How to defend

### noopener

The ```noopener``` keyword can be added to ```a```, ```area``` and ```form``` HTML elements as a value of the ```rel``` attribute. This setting will make sure that after the navigation, the ```window.opener``` value will be set to null. This way it won't be possible for the malicious site to manipulate the original site.

```html
<a href="../attacker-main-app/index.html" rel="noopener" target="_blank">Click for more kittens</a>
```

### noreferrer

The ```noreferrer``` keyword can be added to ```a```, ```area``` and ```form``` HTML elements as a value of the ```rel``` attribute. This setting will make sure that after the navigation no information regarding the original site will be sent to the opened page. This way it won't be possible for the malicious site to manipulate the original site. It also implies the ```noopener``` setting behavior, so the ```window.opener``` will also be set to null.

```html
<a href="../attacker-main-app/index.html" rel="noreferrer" target="_blank">Click for more kittens</a>
```

[Go to top](#tabnabbing)  
[Back](../README.md)
