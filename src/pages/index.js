import { useState } from "react";
import Layout from "../components/Layout/Layout.js";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput/SearchInput.js";
import CountriesTable from "../components/CountriesTable/CountriesTable.js";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.header_row}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <SearchInput
          placeholder='Filter by name, region or subregion...'
          onChange={onInputChange}
        />
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: { countries },
  };
};
