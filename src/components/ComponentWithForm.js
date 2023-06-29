function ComponentWithForm({ name, formName, title, children, onSubmit }) {
  return (
    <div className={`component component_type_${name}`}>
      <div className={`component__container component__container_type_${name}`}>
        <h2 className={`component__title component__title_type_${name}`}>{title}</h2>
        <form className={`form form_type_${name}`} name={formName} method="post" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ComponentWithForm;