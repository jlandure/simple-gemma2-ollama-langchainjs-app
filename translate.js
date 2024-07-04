import { OllamaFunctions } from "@langchain/community/experimental/chat_models/ollama_functions";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function translate() {

    const model = new OllamaFunctions({
        temperature: 0.1,
        model: "gemma2",
    });

    const messages = [
        new SystemMessage("Translate the following from English into French"),
        new HumanMessage("hi!"),
    ];

    const parser = new StringOutputParser();
    const result = await model.invoke(messages);

    const humanReadableResult = await parser.invoke(result);
    console.log(humanReadableResult);
    // Bonjour !
}