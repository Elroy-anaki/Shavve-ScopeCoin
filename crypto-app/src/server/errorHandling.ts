import { TRPCError } from '@trpc/server';


export const handleError = async (action: () => Promise<any>) => {
  try {
    return await action();  
  } catch (error: any) {
    
    console.error('Error occurred:', {
      message: error.message || 'Unknown error',
      stack: error.stack || 'No stack trace available',
      name: error.name || 'Unknown error type',
    });

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Something went wrong: ${error.message}`,
    });
  }
};
