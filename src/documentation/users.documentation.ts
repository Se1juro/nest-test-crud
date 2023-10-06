export const chargeBalanceBody = {
  type: 'object',
  properties: {
    balance: {
      type: 'number',
      examples: [
        {
          balance: 100,
        },
        {
          balance: 22.98,
        },
      ],
    },
  },
};

export const chargeBalanceResponse = {
  schema: {
    type: 'object',
    properties: {
      balance: {
        type: 'number',
        examples: [
          {
            balance: 100,
          },
          {
            balance: 22.98,
          },
        ],
      },
    },
  },
  status: 200,
};
