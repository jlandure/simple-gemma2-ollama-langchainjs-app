# Install JS dependencies

`npm i`

or 

`npm i langchain @langchain/community`

# Use a local LLM with Ollama in Docker

`docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama`

# Launch JS project

`npm start`

There is two main files who use the *Gemma2:9b* model
- [translate.js](./translate.js) with a simple translation function
- [extract.js](./extract.js) with function calling for entities extraction in a JSON format

Note: Have to try the *Gemma2:2b* when available and you can already use the *Gemma2:27b* model.

# Pull images before use it

`docker exec -it ollama ollama pull gemma2`

# Test Gemma2 using CLI

You can instanciate new Gemma2 model in the CLI directly: `docker exec -it ollama ollama run gemma2`

You can also test older Gemma: `docker exec -it ollama ollama run gemma:2b`

# Use GPU to boost performance

Note: it is not available on Mac with Docker😓
> currently Docker on Mac does not see the GPU. -- [Ken Rimple](https://chariotsolutions.com/blog/post/apple-silicon-gpus-docker-and-ollama-pick-two/)

If you want GPU, you have to install Ollama natively and forget Docker. [Native Ollama Does Support Apple Silicon](https://chariotsolutions.com/blog/post/apple-silicon-gpus-docker-and-ollama-pick-two/)

# Licence

Apache License Version 2.0