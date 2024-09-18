'use server';

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from '@/lib/db/schema/resources';
import { db } from '@/lib/db';

import { embeddings as embeddingsTable } from '@/lib/db/schema/embeddings';
import { generateEmbeddings } from './embedding';

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = insertResourceSchema.parse(input);

    console.log('Creating resource with content:', content);

    const [resource] = await db
      .insert(resources)
      .values({ content })
      .returning();


    console.log('Resource created:', JSON.stringify(resource));

    const embeddings = await generateEmbeddings(content);
    const [InputEmbbeding] = await db.insert(embeddingsTable).values(
      embeddings.map(embedding => ({
        resourceId: resource.id,
        ...embedding,
      })),
    )
    .returning();
    
    console.log('InputEmbbeding created:', JSON.stringify(InputEmbbeding));

    return 'Resource successfully created and embedded.';
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};