import { sendErrorToSentry } from '@helpers';

const resolvers = {
  Query: {
    foo: () => {
      try {
        return 'foo';
      } catch (err) {
        sendErrorToSentry(err);
        return err;
      }
    },
  },
};

export default resolvers;
