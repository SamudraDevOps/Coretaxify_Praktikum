import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { RoutesApi } from '@/Routes';

export const useObjekPajak = (bupotType) => {
  const [objekPajak, setObjekPajak] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const fetchObjekPajak = async () => {
      if (!bupotType) return;
      
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${RoutesApi.apiUrl}bupot-objek-pajaks`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            params: {
              column_filters: {
                tipe_bupot: bupotType
              },
            },
          }
        );
        
        console.log('Objek Pajak Response:', data);
        setObjekPajak(data.data || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch objek pajak');
        console.error('Error fetching objek pajak:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchObjekPajak();
  }, [bupotType, cookies.token]);

  return { objekPajak, loading, error };
};
