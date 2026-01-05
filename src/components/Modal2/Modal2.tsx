import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import Headling from '../Headling/Headling';
import Input from '../Input/Input';
import styles from './Modal2.module.css';
import type { formField, Modal2Props } from './Modal2.props';
import { useClickOutside } from '../../hooks/useClickOutside';

const Modal2 = ({children, account_id, onClose, visible, submit, fields, initialData = {}, submitText = 'Добавить'}: Modal2Props) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const ModalRef = useRef<HTMLDivElement>(null);
  useClickOutside(ModalRef, onClose, visible);
  const ChangeFunction = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldName === 'amount' || fieldName === 'account_id' ? (value === '' ? null : Number(value)): value
    }));
  };

  useEffect(() => {
    if (visible) {
      const initialValues: Record<string, unknown> = {};
      
      initialValues.account_id = account_id;
      
      fields.forEach(field => {
        if (initialData && field.name in initialData) {
          initialValues[field.name] = initialData[field.name];
        } else {
          switch (field.type) {
            case 'number':
              initialValues[field.name] = null;
              break;
            case 'select':
              initialValues[field.name] = '';
              break;
            default:
              initialValues[field.name] = '';
          }
        }
      });
      
      setFormData(initialValues);
    }
  }, [visible, fields, initialData, account_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        submitData.append(key, String(value));
      }
    });
    
    if (submit) {
      submit(e);
    }
  };

  const renderField = (field: formField) => {
    const value = formData[field.name] ?? '';
    const isRequired = field.required !== undefined ? field.required : false;

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className={styles['field-group']}>
            <label htmlFor={field.name} className={styles['labal']}>
              {field.label}
            </label>
            <select
              name={field.name}
              value={String(value)}
              onChange={(e) => ChangeFunction(field.name, e.target.value)}
              className={styles.select}
              required={isRequired}
            >
              {!isRequired && <option value="">Выберите...</option>}
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'number':
        return (
          <div key={field.name} className={styles['field-group']}>
            <label htmlFor={field.name} className={styles['labal']}>
              {field.label}
            </label>
            <Input
              name={field.name}
              type="number"
              value={value === null ? '' : String(value)}
              onChange={(e) => ChangeFunction(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
              required={isRequired}
              style={field.name === 'amount' ? { marginBottom: '70px' } : undefined}
            />
          </div>
        );

      default: 
        return (
          <div key={field.name} className={styles['field-group']}>
            <label htmlFor={field.name} className={styles['labal']}>
              {field.label}
            </label>
            <Input
              name={field.name}
              type="text"
              value={String(value)}
              onChange={(e) => ChangeFunction(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
              required={isRequired}
            />
          </div>
        );
    }
  };

  if (!visible) return null;

  return (
    <div className={styles['container-modal']} ref={ModalRef}>
      <div className={styles['body']}>
        <div className={styles['modal-overlay']}>
          <div>
            <button onClick={onClose} className={styles['close']}type="button">
              <img src="/add.svg" alt="close" className={styles['img-close']} />
            </button>
            
            <form className={styles['content']} onSubmit={handleSubmit}>
              <Headling style={{ fontSize: '28px', marginBottom: '30px' }}>
                {children}
              </Headling>
              {fields.map(renderField)}
              <Button type="submit">{submitText}</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal2;