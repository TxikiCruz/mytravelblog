import SearchByContinent from '../search/SearchByContinent'

const Footer = () => {
  return <>
    <aside className="sub_footer">
      <SearchByContinent />
    </aside>

    <footer className="footer">
      <div className="container">
        <div className="flex">
          <p>myTravelBlog</p>
        </div>
      </div>
    </footer>
  </>
}

export default Footer