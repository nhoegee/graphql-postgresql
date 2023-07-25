import "reflect-metadata";

import Koa from 'koa';
import mount from 'koa-mount';
import { createHandler } from 'graphql-http/lib/use/koa';
import { RecipeResolver } from './schemas'
import { buildSchema } from "type-graphql";

async function bootstrap() {
    const app = new Koa();
    const schema = await buildSchema({
        resolvers: [RecipeResolver],
        emitSchemaFile: true,
    });

    app.use(mount('/graphql', createHandler({ schema })))

    app.listen(3000)
}

bootstrap()
