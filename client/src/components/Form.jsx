import Input from "./Input"
import SelectLocation from "./SelectLocation"
import SelectService from "./SelectService"
import { selectStyleInForm } from '../style/selectStyle';

const Form = ({ handleSubmit, handleChange, btnText, formData, errors, handleServiceChange }) => {
    return (
        <form onSubmit={handleSubmit}>
            {btnText === "Register" && <SelectLocation handleChange={handleChange} errors={errors} />}
            {btnText === "Add Service" &&
                <div className="input-group">
                    <SelectService handleChange={handleServiceChange} selectStyle={selectStyleInForm} />
                    <div className="error-message">{errors.service}</div>
                </div>}
            {formData.map(data => {
                return <Input key={data.id} {...data} handleChange={handleChange} />
            })}
            <button className="btn-secondary" type="submit">{btnText}</button>
        </form>
    )
}

export default Form