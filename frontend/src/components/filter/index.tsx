import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Store } from '../../types/store';
import { Summary } from '../../types/summary';
import { makeRequest } from '../../util/request';
import './styles.css';

const initialSummary = {
  sum: 0,
  min: 0,
  max: 0,
  avg: 0,
  count: 0
}

function Filter() {

  const [selectStore, setSelectStore] = useState<Store[]>([]);
  const [summary, setSummary] = useState<Summary>(initialSummary)

  const {
    control,
  } = useForm();

  useEffect(() => {
    makeRequest('/stores').then((response) => {
      setSelectStore(response.data);
    });
  }, []);


  const onSubmit = (formData: Store) => {
    makeRequest('/sales/summary', { params: { storeId: formData.id } }).then((response) => {
      setSummary(response.data);
    })
      .catch(() => {
        console.log('Erro ao consultar loja');
      });
  };

  const handleChangeGenre = (value: Store) => {
    if (value === null) {
      onSubmit({ id: 0, name: "" })
    } else {
      onSubmit({ id: value.id, name: value.name })
    }
  }

  return (
    <>
      <div className="filter-container base-card">
        <Controller
          name="store"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder={'Selecione a loja'}
              options={selectStore}
              className="store-select"
              classNamePrefix="store-select-prefix"
              getOptionLabel={(store: Store) => store.name}
              getOptionValue={(store: Store) =>
                String(store.id)
              }
              isClearable
              onChange={(value) => handleChangeGenre(value as Store)}
            />
          )}
        />
      </div>
    </>
  )
}

export default Filter;
