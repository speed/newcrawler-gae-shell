

Goes through the process of creating an App Engine NewCrawler using Java and Maven in phases.


## Project setup, installation, and configuration

How do I, as a developer, start working on the project?

1. newcrawler-gae-shell
1. `mvn clean appengine:devserver`

<!---
1. What dependencies does it have (where are they expressed) and how do I install them?
1. Can I see the project working before I change anything?

How do I run the project's automated tests?

* Unit Tests

* Integration Tests
 -->

## Deploying

### How to deploy

1. Create a project in [Google Cloud Console](https://cloud.google.com/console)
2. edit ...**/webapp/WEB-INF/appengine.web.xml** and change **your-app-id**
```
git clone https://github.com/speed/newcrawler-gae-shell.git \
   	&& cd newcrawler-gae-shell \
   	&& mvn clean appengine:update
```

