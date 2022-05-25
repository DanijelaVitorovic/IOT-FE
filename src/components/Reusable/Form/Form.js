import React from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import Field from './Field';
import '../../../styles/scss/app/Form.scss';

const form = (props) => {
  const {
    onSubmit,
    initialValues,
    formConfig,
    translations,
    onCancel,
    className,
    disableAll,
    removeCancel,
    submitLabel,
    quitLabel,
    decoratedOnClick,
  } = props || {};
  const { fields } = formConfig || {};

  const renderField = (field, index, values) => (
    <Field
      key={`${field?.name}_${index}`}
      field={field}
      values={values}
      translations={translations}
      disable={disableAll}
      size={field.size}
    />
  );

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues || {}}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} className={`${className} Form`}>
          <div className="fields">
            {fields &&
              fields.map(
                (field, index) =>
                  !field.notVisible && renderField(field, index, values)
              )}
          </div>
          <div className="buttons">
            <Button
              variant="primary"
              className="col-5 m-auto"
              disabled={submitting || pristine}
              type="submit"
              onClick={decoratedOnClick}
            >
              {submitLabel || 'Sačuvaj'}
            </Button>
            {!removeCancel && (
              <Button
                variant="outline-primary"
                className="col-6"
                onClick={() => {
                  form.reset();
                  onCancel && onCancel();
                }}
                type="reset"
              >
                {quitLabel}
              </Button>
            )}
          </div>
        </form>
      )}
    />
  );
};

export default form;
