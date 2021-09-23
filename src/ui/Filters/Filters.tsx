import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slider from '@mui/material/Slider';
import { Button, Drawer } from 'ui';
import { useStyles } from './Filters.style';
import { Chip,  } from '@material-ui/core';
import { MOONSAMA_TRAITS, ORDER_TYPES } from 'utils/constants';
import FilterIcon from '@mui/icons-material/FilterListSharp';


export interface Filters {
  priceRange: number[]
  traits: string[]
  selectedOrderTypes: string[]
}

interface Props {
  onFiltersUpdate: (x: Filters) => void
}

export const Filters = ({ onFiltersUpdate }: Props) => {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<number[]>([1, 400]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedOrderTypes, setSelectedOrderTypes] = useState<string[]>([]);
  const { filtersDrawerContent, applyFiltersButton, filterAccordion, accordionHeader, accordionContent, filterChip, priceRangeWrapper, filtersTitle } = useStyles();

  const handleApplyFilters = () => {

    onFiltersUpdate({
      selectedOrderTypes,
      traits: selectedTraits,
      priceRange,
    });
    setIsDrawerOpened(false);
  };

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleOrderTypeClick = (orderType: string) => {
    if(selectedOrderTypes.includes(orderType)){
      setSelectedOrderTypes(selectedOrderTypes.filter(selectedOrderType => selectedOrderType !== orderType));

      return;
    }

    setSelectedOrderTypes([...selectedOrderTypes, orderType]);
  };

  const handleTraitClick = (trait: string) => {
    if(selectedTraits.includes(trait)){
      setSelectedTraits(selectedTraits.filter(selectedTrait => selectedTrait !== trait));

      return;
    }

    setSelectedTraits([...selectedTraits, trait]);
  };

  return (
    <>
      <Button
        onClick={() => setIsDrawerOpened(true)}
        startIcon={<FilterIcon />}
        variant="outlined"
        color="primary"
      >
        Filter
      </Button>
      <Drawer
        anchor="left"
        hideBackdrop
        open={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        onOpen={() => setIsDrawerOpened(true)}
      >
        <Typography variant="h6" className={filtersTitle}>Filters</Typography>
        <div className={filtersDrawerContent}>
          <div>
            <Accordion defaultExpanded square className={filterAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={accordionHeader}>Order Type</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={accordionContent}>
                  <Chip
                    label="Buy Now"
                    variant="outlined"
                    onClick={() => handleOrderTypeClick('buy_now')}
                    className={`${filterChip} ${selectedOrderTypes.includes('buy_now') && 'selected'}`} />
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded square className={filterAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={accordionHeader}>Price</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Slider
                  getAriaLabel={() => 'Price range'}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={400}
                  sx={{
                    "& .MuiSlider-thumb":{
                      color: "#710021",
                    },
                    "& .MuiSlider-track": {
                      color: '#710021'
                    },
                    "& .MuiSlider-rail": {
                      color: '#c5c5c5'
                    }
                  }}
                />
                <div className={priceRangeWrapper}>
                  <div>{`${priceRange[0]} MOVR`}</div>
                  <div>{`${priceRange[1]} MOVR`}</div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded square className={filterAccordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={accordionHeader}>Traits</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={accordionContent}>
                  {Object.keys(MOONSAMA_TRAITS).map(trait =>
                    <Chip
                      label={trait}
                      variant="outlined"
                      onClick={() => handleTraitClick(trait)}
                      className={`${filterChip} ${selectedTraits.includes(trait) && 'selected'}`}
                    />
                  )}
                </div>
              </AccordionDetails>
            </Accordion>
            <Button
              className={applyFiltersButton}
              onClick={handleApplyFilters}
              variant="contained"
              color="primary"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
