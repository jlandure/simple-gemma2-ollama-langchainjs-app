# Install

`npm i langchain @langchain/community`

# Local LLM with Ollama

`docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama`

# Launch JS project

`npm start`

# Test Gemma2 using CLI

You can instanciate new Gemma2 model in the CLI directly: `docker exec -it ollama ollama run gemma2`
You can also test older Gemma: `docker exec -it ollama ollama run gemma:2b`

# Licence

Apache License Version 2.0