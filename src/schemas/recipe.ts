/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Args, ArgsType, Field, ID, Int, ObjectType, Query, Resolver } from 'type-graphql'
import { sql } from '../db'

@ObjectType()
export class Recipe {
    @Field(type => ID)
    id!: string;

    @Field()
    title!: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ name: 'creationDate' })
    creation_date!: Date;

    @Field(type => [String])
    ingredients!: string[];
}

@ArgsType()
class RecipesArgs {
    @Field(type => Int)
    skip = 0;

    @Field(type => Int)
    take = 0;
}

@Resolver(Recipe)
export class RecipeResolver {
    @Query(returns => Recipe)
    async recipe(@Arg("id") id: string) {
        const [recipe]: [Recipe?] = await sql`
            select * 
            from recipes
            where id = ${id}
        `

        if (recipe == null) {
            throw new Error('Not found')
        }

        return recipe;
    }

    @Query(returns => [Recipe])
    async recipes(@Args() { skip, take }: RecipesArgs) {
        return await sql<Recipe[]>`
            select *
            from recipes
            limit ${take || sql`all`} ${skip > 0
                ? sql`offset ${skip}`
                : sql``
            }
        `;
    }
}