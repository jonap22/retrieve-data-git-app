const { sumRepositoriesStars, getFormattedDate, getFormattedData } = require("../app/api");

test('getFormattedData returns formatted api data', async () => {
  const responseData = [
    { stargazers_count: 10, description: 'Repo 1', name: 'repo1', created_at: '2010-12-17T04:19:18Z', url: 'https://github.com/repo1', atr: 'atr' },
    { stargazers_count: 5, description: 'Repo 2', name: 'repo2', created_at: '2023-07-28T12:00:00Z', url: 'https://github.com/repo2', atr: 'atr' },
  ];

  const formattedData = await getFormattedData(responseData);

  expect(formattedData).toEqual([
    { stargazers_count: 10, description: 'Repo 1', name: 'repo1', created_at: '2010-12-17T04:19:18Z', url: 'https://github.com/repo1' },
    { stargazers_count: 5, description: 'Repo 2', name: 'repo2', created_at: '2023-07-28T12:00:00Z', url: 'https://github.com/repo2' },
  ]);
});

test('getFormattedDate replaces "T" with "at" and "Z" with " "', () => {
  const date = '2023-07-28T12:00:00Z';
  const expectedFormattedDate = getFormattedDate(date);

  expect(expectedFormattedDate).toEqual('2023-07-28 at 12:00:00');
});

test('sumRepositoriesStars returns the correct sum of stars', () => {
  const data = [
    { stargazers_count: 10 },
    { stargazers_count: 5 },
    { stargazers_count: 8 },
  ];

  const totalStars = sumRepositoriesStars(data);
  expect(totalStars).toBe(23);
});
