import { useEffect, useState } from "react"
import axios from "../axios";
import Select from "../components/Select";
import ShowCase from '../components/ShowCase';
import Screen from '../components/Screen';
import Loading from "../components/Loading";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadingData('220');
  }, []);

  const loadingData = async (numberShow) => {
    try {
      const response = await axios.get("chairs?number_show=" + numberShow);
      const chairs = response.data;

      const sortedChairs = chairs.sort((a, b) => {
        return parseInt(a.text) - parseInt(b.text);
      });
      

      const chunkedChairs = [];

      for (let i = 0; i < sortedChairs.length; i += 3) {
        chunkedChairs.push(sortedChairs.slice(i, i + 3));
      }

      setData(chunkedChairs);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (event) => {
    loadingData(event.target.value);
  };

  const selectItem = (id, item) => {
    if (item.status === 'sold') return;

    let text;

    const newData = data.map(el => {
      return el.map(e => {
        if (e._id === id) {
          text = e.text;
          e.status = 'selected';
        }

        return e;
      });
    });

    setData(newData);

    setTimeout(async () => {
      let a = prompt('Գրեք Ձեր անուն ազգանունը');

      if (a) {
        await axios.patch(`chairs/${id}`, { status: 'sold', client: a });
        alert(`Հարգելի ${a}, Դուք ամրագրել եք ${text} նստատեղը`);

        const newData = data.map(el => {
          return el.map(e => {
            if (e._id === id) {
              text = e.text;
              e.status = 'sold';
            }

            return e;
          });
        });

        setData(newData);

      } else {
        const newData = data.map(el => {
          return el.map(e => {
            if (e._id === id) {
              text = e.text;
              e.status = 'available';
            }

            return e;
          });
        });

        setData(newData);
      }
    }, 200)
  }

  return (
    <div className="HomePage">
      {loading && <Loading />}

      {
        !loading && <>
          <Select handleSelectChange={handleSelectChange} />
          <ShowCase />
          <Screen />

          <div className="container">
            {
              data.map((chair, i) => <div className="block" key={i}>
                <div className="table"></div>

                <div className="chairs">
                  {
                    chair.map(item => <div
                      key={item._id}
                      className={`item ${item.status}`}
                      onClick={() => selectItem(item._id, item)}
                    >
                      {item.text}
                    </div>)
                  }
                </div>
              </div>)
            }
          </div>
        </>
      }
    </div>
  )
}
