import axios from 'axios';
import { useEffect, useState } from 'react';
import DetailsModal from '../components/DetailsModal';
import { MdOutlineArrowBack } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import { servicebaseurl } from '../config';

var baseUrl = servicebaseurl;

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);


  const changeTheme = () => {
    dispatch(toggleTheme());
  };


  async function fetchAnalytics() {
    try {
      const response = await axios.get(`${baseUrl}url/allcode`);
      const res = response?.data || []
      setData(res);
    } catch (err) {
      console.log(err?.message || "Unable to fetch analytics.");
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const pad = (n) => n.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear().toString().slice(-2);

    let hours = date.getHours();
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    hours = pad(hours);

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  };


  const handleView = async (item) => {
    setSelectedItem(null);
    setViewData(null);
    setShowModal(true);
    try {
      const result = await axios.get(`${baseUrl}analytics/${item.short_code}`)
      const res = result.data;
      setSelectedItem(res);
      setViewData(item);
    } catch (error) {
      console.log("Error - handleView : ", error)
      setShowModal(false);
    }
  }

  return (
    <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} min-h-screen p-6 transition-all duration-300`}>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate('/')} className="text-xl font-bold"><MdOutlineArrowBack /></button>
        <h1 className="text-3xl font-bold">URL's Analytics</h1>
        <button
          onClick={changeTheme}
          className="px-4 py-2 rounded-lg text-sm font-medium shadow bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {theme === 'dark' ? <CiLight /> : <MdDarkMode />}
        </button>
      </div>

      <div className={`overflow-x-auto rounded-xl shadow-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="min-w-full table-fixed text-sm text-left">
          <thead className={`${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-600'}`}>
            <tr>
              <th className="px-5 py-3 border-b border-gray-300 w-16">ID</th>
              <th className="px-5 py-3 border-b border-gray-300 w-1/2">Original URL</th>
              <th className="px-5 py-3 border-b border-gray-300 w-1/4">Short URL</th>
              <th className="px-5 py-3 border-b border-gray-300 w-1/4">Created At</th>
              <th className="px-5 py-3 border-b border-gray-300 w-1/4">Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}>
                <td className="px-5 py-3 border-b border-gray-300">{item.id}</td>

                <td className="px-5 py-3 border-b border-gray-300 max-w-xs break-words whitespace-normal">
                  {item.original_url}
                </td>

                <td className="px-5 py-3 border-b border-gray-300 break-words whitespace-normal">
                  <a
                    href={`${baseUrl}${item.short_code}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    {baseUrl}{item.short_code}
                  </a>
                </td>

                <td className="px-5 py-3 border-b border-gray-300">
                  {formatDateTime(item.created_at)}
                </td>
                <td className="px-5 py-3 border-b border-gray-300">
                  <button
                    onClick={() => handleView(item)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedItem && viewData && (
        <DetailsModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedItem={selectedItem}
          viewData={viewData}
          formatDateTime={formatDateTime}
        />
      )}
    </div>
  );
};

export default AnalyticsPage;
