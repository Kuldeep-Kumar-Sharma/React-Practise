import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    country(code: "IN") {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const { name, currency, capital, native, emoji, languages } =
    data?.country || {};

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div key={name}>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead class="ltr:text-left rtl:text-right">
            <tr>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Country
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Capital
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Flag
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Native
              </th>
              <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Major language
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <tr>
              <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 place-items-center">
                {name}
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                {capital}
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">{emoji}</td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                {native}
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                {currency}
              </td>
              <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                {languages?.map((lang) => (
                  <ol key={lang.code}>
                    <li>Language: {lang.name}</li>
                    <li>Code: {lang.code}</li>
                  </ol>
                ))}{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
