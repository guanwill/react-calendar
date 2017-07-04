import React from 'react';

export const FormErrors = ({formErrors}) =>
  <div>
    {Object.keys(formErrors).map((formErrorField) => {
      return (
        formErrors[formErrorField].map((error) => {
          return (
            <p>{formErrorField} {error}</p>
          )
        })
      )
    })}
  </div>

//specifying what type the formError should be
FormErrors.propTypes = {
  formErrors: PropTypes.object.isRequired //it should be an object
}
