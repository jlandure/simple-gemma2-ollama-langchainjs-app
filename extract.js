import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { OllamaFunctions } from "@langchain/community/experimental/chat_models/ollama_functions";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputFunctionsParser } from "@langchain/core/output_parsers/openai_functions";

export async function extract() {

    const EXTRACTION_TEMPLATE = `Extract relevant information mentioned in the following passage with their properties.

    Passage:
    {input}
    `;

    const prompt = PromptTemplate.fromTemplate(EXTRACTION_TEMPLATE);

    // Use Zod for easier schema declaration
    const schema = z.object({
        characters: z.array(
            z.object({
                name: z.string().describe("The name of a character"),
                animal: z.string().describe("The type of animal"),
                cheese: z.optional(z.boolean()).describe("Please indicate if the character owns the cheese at the end of the story."),
            })
        ),
    });

    const model = new OllamaFunctions({
        temperature: 0.1,
        model: "gemma2",
    }).bind({
        functions: [
            {
                name: "information_extraction",
                description: "Extracts the relevant information from the passage.",
                parameters: {
                    type: "object",
                    properties: zodToJsonSchema(schema),
                },
            },
        ],
        function_call: {
            name: "information_extraction",
        },
    });

    // Use a JsonOutputFunctionsParser to get the parsed JSON response directly.
    const chain = await prompt.pipe(model).pipe(new JsonOutputFunctionsParser());

    const response = await chain.invoke({
        input:
            `
Maître Corbeau, sur un arbre perché,
Tenait en son bec un fromage.
Maître Renard, par l'odeur alléché,
Lui tint à peu près ce langage :
Et bonjour, Monsieur du Corbeau,
Que vous êtes joli ! que vous me semblez beau !
Sans mentir, si votre ramage
Se rapporte à votre plumage,
Vous êtes le Phénix des hôtes de ces bois.
À ces mots le Corbeau ne se sent pas de joie,
Et pour montrer sa belle voix,
Il ouvre un large bec, laisse tomber sa proie.
Le Renard s'en saisit, et dit : Mon bon Monsieur,
Apprenez que tout flatteur
Vit aux dépens de celui qui l'écoute.
Cette leçon vaut bien un fromage sans doute.
Le Corbeau honteux et confus
Jura, mais un peu tard, qu'on ne l'y prendrait plus.
`,
    });

    console.log(response);
    /*
    {
        characters: [
            { name: 'Maître Corbeau', animal: 'Corbeau', cheese: true },
            { name: 'Maître Renard', animal: 'Renard', cheese: false }
        ]
    }
    */
}