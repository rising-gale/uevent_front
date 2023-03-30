import { useEffect } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";
  
  const PlacesAutocomplete = ({isLoaded, setLocation}) => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      init,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        /* Define search scope here */
      },
      debounce: 300,
    });
    const ref = useOnclickOutside(() => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });
    useEffect(() => {
        console.log(isLoaded)
        if(isLoaded)
            init();
    }, [isLoaded, init]);
    const handleInput = (e) => {
      // Update the keyword of the input element
      setValue(e.target.value);
    };
  
    const handleSelect =
      ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();
        // console.log(description);
        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          console.log("📍 Coordinates: ", { lat, lng });
          setLocation({ lat, lng, description });
        });
      };
  
    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;
  
        return (
          <li key={place_id} onClick={handleSelect(suggestion)} className="py-1 pl-1 hover:cursor-pointer hover:bg-slate-500 w-full text-justify">
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });
  
    return (
    //   <div ref={ref}>
    <div ref={ref} className='p-1 m-1'>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Type the adress and choose from list."
          className="text-black font-semibold text-lg p-2 w-full outline-none rounded-sm"
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" &&
        <div className="relative">
            <ul className="absolute z-10 text-black w-full mt-1 bg-slate-100">{renderSuggestions()}</ul>
        </div> }
      </div>
    );
  };

  export default PlacesAutocomplete;