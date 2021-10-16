import { Result } from './functional';

export abstract class UseCase<Input, OutPut> {

    async execute(input: Input): Promise<Result<OutPut>> {
        try {
            return this.buildUseCase(input);
        } catch (error) {
            throw error;
        }
    }

    protected abstract buildUseCase(input: Input): Promise<Result<OutPut>>;
}