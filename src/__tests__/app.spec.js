describe(
    'Hello', () => {
        test(
            'Hello, test', () => {
                expect(true).toBe(true);
            }
        )
        test(
            'Another one test', () => {
                expect(true).toBeTruthy();
            }
        )
    }
)
