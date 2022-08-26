import './styles.css';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Sales, SalesByGender, SalesSummary, Store } from '../../types';
import { makeRequest } from '../../util/request';

type Props = {
  onSubmitSales: (sales: Sales) => void
}

const salesInitalSummary = {
  sum: 0,
  min: 0,
  max: 0,
  avg: 0,
  count: 0
}

function Filter({ onSubmitSales }: Props) {

  const [selectStore, setSelectStore] = useState<Store[]>([]);
  const [salesSummary, setSalesSummary] = useState<SalesSummary>(salesInitalSummary);
  const [salesByGender, setSalesByGender] = useState<SalesByGender[]>([]);

  const { control } = useForm();

  useEffect(() => {
    makeRequest('/stores').then((response) => {
      setSelectStore(response.data);
    });

    makeRequest('sales/summary', { params: { storeId: 0 } })
      .then((response) => {
        setSalesSummary(response.data);
        makeRequest('/sales/by-gender', { params: { storeId: 0 } })
          .then((response) => {
            const updateFormData = response.data;
            setSalesByGender(updateFormData);
          })
      })
      .catch(() => {
        console.log("Erro ao consultar a(s) loja(s)");
      })
  }, []);

  useEffect(() => {
    onSubmitSales({ salesByGender: salesByGender, salesSummary: salesSummary })
  }, [onSubmitSales, salesByGender, salesSummary])

  const onSubmit = (formData: Store) => {
    makeRequest('sales/summary', { params: { storeId: formData.id } })
      .then((response) => {
        setSalesSummary(response.data);
        makeRequest('/sales/by-gender', { params: { storeId: formData.id } })
          .then((response) => {
            const updateFormData = response.data;
            setSalesByGender(updateFormData);
          })
      })
      .catch(() => {
        console.log("Erro ao consultar a(s) loja(s)");
      })
  }

  const handleChangeGender = (value: Store) => {
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
              onChange={(value) => handleChangeGender(value as Store)}
            />
          )}
        />
      </div>
    </>
  )
}

export default Filter;
