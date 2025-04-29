export const supabase = {
  from: () => ({
    select: () => ({
      data: [],
      error: null,
    }),
  }),
  auth: {
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn().mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
      error: null,
    }),
    getSession: jest.fn().mockResolvedValue({
      data: {
        session: null,
      },
      error: null,
    }),
  },
}
