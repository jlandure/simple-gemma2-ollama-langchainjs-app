# Install JS dependencies

`npm i langchain @langchain/community`

# Use a local LLM with Ollama in Docker

`docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama`

# Launch JS project

`npm start`

There is two main files who use the *Gemma2:9b* model
- [translate.js](./blob/main/translate.js) with a simple translation function
- [extract.js](./blob/main/extract.js) with function calling for entities extraction in a JSON format

Note: Have to try the *Gemma2:2b* when available and you can already use the *Gemma2:27b* model.

# Test Gemma2 using CLI

You can instanciate new Gemma2 model in the CLI directly: `docker exec -it ollama ollama run gemma2`

You can also test older Gemma: `docker exec -it ollama ollama run gemma:2b`

# Licence

Apache License Version 2.0