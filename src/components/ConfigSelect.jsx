import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { fetchInputConfigs } from "src/services/inputConfig.service";

const ConfigSelect = ({ setConfigName, setSelectedID, clearInputs }) => {
	const [inputOptions, setInputOptions] = useState([]);
	const [currentOption, setCurrentOption] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const createOption = (label, value = "") => ({
		label,
		value,
	});

	useEffect(() => {
		const listInputs = async () => {
			try {
				setIsLoading(true);
				const inputConfigs = await fetchInputConfigs();
				console.debug("inputConfigs: ", inputConfigs);
				const data = inputConfigs?.data?.data;
				const options = data.map(({ config_name, id }) => ({
					label: config_name,
					value: id,
				}));

				setInputOptions(options);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setInputOptions([]);
			}
		};
		listInputs();
	}, []);

	return (
		<div className="grid-rows-2 lg:mt-5 md:mt-5 sm:mt-5 max-sm:mt-5 ">
			<div>
				<label className="block font-medium lg:text-lg md:text-xs sm:text-xs max-sm:text-xs">
					Config Name
				</label>
				<div className="mt-2">
					<CreatableSelect
						isClearable
						isLoading={isLoading}
						options={inputOptions}
						value={currentOption}
						onChange={(e) => {
							try {
								console.info("handling on change");
								setCurrentOption(e);
								if (e !== null) {
									setConfigName(e?.label);
									setSelectedID(e?.value);
								} else {
									setConfigName("");
									setSelectedID("");
									clearInputs();
								}
							} catch (error) {
								console.error("error: ", error);
								setConfigName("");
								setSelectedID("");
								clearInputs();
							}
						}}
						onCreateOption={(label) => {
							console.info("handling on create");
							clearInputs();
							setIsLoading(true);
							setConfigName(label);
							const newOpt = createOption(label);
							setInputOptions((inputConfigs) => [...inputConfigs, newOpt]);
							setCurrentOption(newOpt);
							setIsLoading(false);
						}}
						on
					/>
				</div>
			</div>
		</div>
	);
};

export default ConfigSelect;
