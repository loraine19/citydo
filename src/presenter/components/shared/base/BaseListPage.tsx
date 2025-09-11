import React, { useState } from 'react';

import { Icon } from '../../common/IconComp';
import { Button, SegmentedButton, } from './baseComps/Buttons';
import { CardMD, } from './baseComps/Cards';
import { Fab, FabMenu } from './baseComps/Fabs';
import { Carousel } from './baseComps/Carrousel';
import { AppBar, NavigationBar, NavigationBarItem, NavigationDrawer } from './baseComps/Navigations';
import { Checkbox, DatePicker, TimePicker } from './baseComps/Selectors';
import { SideSheet } from './baseComps/Sheets';
import { List, ListItem } from './baseComps/Lists';
import { Chip } from './baseComps/Others';
import { Menu, MenuItem, Tabs } from './baseComps/Menu';
import { Tooltip } from './baseComps/Dialogs';
import { ProgressBar, ProgressRing, Slider } from './baseComps/Sliders';

const MD3DemoPage: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSideSheetOpen, setIsSideSheetOpen] = useState(false);
    const [isCheckboxOn, setIsCheckboxOn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
    const [sliderValue, setSliderValue] = useState(50);
    const [sliderValue2, setSliderValue2] = useState(70);
    const [activeTab, setActiveTab] = useState('tab1');
    const [buttonValue, setButtonValue] = useState('1');

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(event.currentTarget);
        setIsMenuOpen(true);
    };

    return (
        <div data-md3 className="p-4 space-y-8 overflow-auto max-w-[1100px] m-auto">
            <h1>Material Design 3 - Boîte à outils</h1>
            <p>
                Ceci est une page de démonstration complète de tous les composants MD3.
                Utilise-la comme une référence pour piocher les blocs de code dont tu as besoin.
            </p>
            {/* Menu de navigation rapide */}
            <nav className="md3-section" style={{ marginBottom: '2rem' }}>
                <h2>Aller à une section</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <a href="#boutons"><Button variant="text">Boutons</Button></a>
                    <a href="#cartes"><Button variant="text">Cartes</Button></a>
                    <a href="#fabs"><Button variant="text">FABs</Button></a>
                    <a href="#carrousel"><Button variant="text">Carrousel</Button></a>
                    <a href="#appbar"><Button variant="text">App Bar</Button></a>
                    <a href="#fabmenu"><Button variant="text">FAB Menu</Button></a>
                    <a href="#segmente"><Button variant="text">Boutons Segmentés</Button></a>
                    <a href="#pickers"><Button variant="text">Date & Time Pickers</Button></a>
                    <a href="#navigation"><Button variant="text">Navigation</Button></a>
                    <a href="#checkboxchips"><Button variant="text">Checkbox & Chips</Button></a>
                    <a href="#listmenu"><Button variant="text">Listes et Menus</Button></a>
                    <a href="#sliders"><Button variant="text">Sliders</Button></a>
                    <a href="#tabs"><Button variant="text">Tabs</Button></a>
                    <a href="#tooltips"><Button variant="text">Tooltips</Button></a>
                </div>
            </nav>

            {/* Boutons */}
            <section id="boutons" className='overflow-hidden min-h-max p-4 border '>
                <h2>Boutons</h2>
                <div className='flex flex-col gap-1 divide-y'>
                    {/* Filled & Tonal */}
                    <div className='md3-component-group'>
                        <Button variant="filled">Rempli</Button>
                        <Button variant="tonal">Tonal</Button>
                        <Button variant="filled" color="secondary">Rempli Secondary</Button>
                        <Button variant="tonal" color="secondary">Tonal Secondary</Button>
                        <Button variant="filled" color="tertiary">Rempli Tertiaire</Button>
                        <Button variant="tonal" color="tertiary">Tonal Tertiaire</Button>
                        <Button variant="filled" color="error">Rempli Erreur</Button>
                        <Button variant="tonal" color="error">Tonal Erreur</Button>
                        <Button variant="filled" color="sky">Rempli Sky</Button>
                        <Button variant="tonal" elevating color="sky">Tonal Sky</Button>
                        <Button variant="filled" color="cyan">Rempli Cyan</Button>
                        <Button variant="tonal" color="cyan">Tonal Cyan</Button>
                        <Button variant="filled" color="rose">Rempli Rose</Button>
                        <Button variant="tonal" color="rose">Tonal Rose</Button>
                        <Button variant="filled" color="orange">Rempli Orange</Button>
                        <Button variant="tonal" color="orange">Tonal Orange</Button>
                        <Button variant="filled" elevating color="green">Rempli Green</Button>
                        <Button variant="tonal" color="green">Tonal Green</Button>
                        <Button variant="filled" disabled>Rempli Désactivé</Button>
                        <Button variant="tonal" disabled>Tonal Désactivé</Button>
                    </div>

                    {/* Elevated */}
                    <div className='md3-component-group'>
                        <Button variant="elevated">Élevé</Button>
                        <Button variant="elevated" color="secondary">Élevé Secondary</Button>
                        <Button variant="elevated" color="tertiary">Élevé Tertiaire</Button>
                        <Button variant="elevated" color="error">Élevé Erreur</Button>
                        <Button variant="elevated" color="sky">Élevé Sky</Button>
                        <Button variant="elevated" color="cyan">Élevé Cyan</Button>
                        <Button variant="elevated" color="rose">Élevé Rose</Button>
                        <Button variant="elevated" color="orange">Élevé Orange</Button>
                        <Button variant="elevated" color="green">Élevé Green</Button>
                        <Button variant="elevated" disabled>Élevé Désactivé</Button>
                    </div>

                    {/* Outlined */}
                    <div className='md3-component-group'>
                        <Button variant="outlined">Contour</Button>
                        <Button variant="outlined" color="secondary">Contour Secondary</Button>
                        <Button variant="outlined" color="tertiary">Contour Tertiaire</Button>
                        <Button variant="outlined" color="error">Contour Erreur</Button>
                        <Button variant="outlined" color="sky">Contour Sky</Button>
                        <Button variant="outlined" color="cyan">Contour Cyan</Button>
                        <Button variant="outlined" color="rose">Contour Rose</Button>
                        <Button variant="outlined" color="orange">Contour Orange</Button>
                        <Button variant="outlined" color="green">Contour Green</Button>
                        <Button variant="outlined" disabled>Contour Désactivé</Button>
                    </div>

                    {/* Text */}
                    <div className='md3-component-group'>
                        <Button variant="text">Texte</Button>
                        <Button variant="text" color="secondary">Texte Secondary</Button>
                        <Button variant="text" color="tertiary">Texte Tertiaire</Button>
                        <Button variant="text" color="error">Texte Erreur</Button>
                        <Button variant="text" color="sky">Texte Sky</Button>
                        <Button variant="text" color="cyan">Texte Cyan</Button>
                        <Button variant="text" color="rose">Texte Rose</Button>
                        <Button variant="text" color="orange">Texte Orange</Button>
                        <Button variant="text" color="green">Texte Green</Button>
                        <Button variant="text" disabled>Texte Désactivé</Button>
                    </div>


                </div>
            </section>

            {/* Cartes */}
            <section id='cartes' className='overflow-hidden min-h-max p-4 border '>
                <h2>Cartes</h2>

                <div className="md3-component-group grid grid-rows-[minmax(min-content,30vh)] grid-cols-3" >
                    {/* Filled */}
                    <CardMD variant="filled">Carte remplie</CardMD>
                    {/* Outlined */}
                    <CardMD variant="outlined" >Carte contour</CardMD>
                    {/* Elevated */}
                    <CardMD variant="elevated" >Carte élevée</CardMD>
                    {/* Tonal */}

                    <CardMD
                        imagePosition='left'
                        image={
                            <img
                                src="public/image/welcome.jpg"
                                alt="media"
                            />
                        }>
                        <CardMD.Header>
                            <p className='md3-card-title'> Carte image de gauche</p>
                        </CardMD.Header>
                        <CardMD.Footer>Footer</CardMD.Footer>
                    </CardMD>
                    {/* Avec actions */}
                    <div className='bg-red-500 flex max-h-[45vh]'>
                        <CardMD
                            variant="elevated"
                            image={
                                <CardMD.Image
                                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                                    alt="Nature"
                                    position="top"
                                    className="relative"
                                >
                                    <div className='p-4 space-x-4'>
                                        <Chip
                                            label="Featured"
                                            color="primary"
                                        />
                                        <Chip
                                            label="Featured"
                                            color="rose"
                                        />
                                    </div>
                                </CardMD.Image>
                            }
                        >

                            <CardMD.Headline>
                                Beautiful Landscape
                            </CardMD.Headline>
                            <CardMD.Subhead>
                                Discover the beauty of untouched nature and breathtaking views.
                            </CardMD.Subhead>
                            <CardMD.SupportingText>
                                Explore the most stunning landscapes around the world, from majestic mountains to serene beaches. Find your next adventure and immerse yourself in nature's wonders.
                            </CardMD.SupportingText>
                            <CardMD.Footer>
                                <Button variant="filled" color="rose">
                                    Learn More
                                </Button>
                            </CardMD.Footer>
                        </CardMD>
                    </div>

                </div>
            </section>

            {/* FABs */}
            <section id='fabs' className='overflow-hidden min-h-max p-4 border '>
                <h2>Boutons d'Action Flottants (FAB)</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                    <Fab icon={<span className="material-icons">add</span>} />
                    <Fab variant="small" icon={<span className="material-icons">edit</span>} />
                    <Fab variant="large" icon={<span className="material-icons">favorite</span>} />
                    <Fab variant="extended" icon={<span className="material-icons">add</span>} text="Créer" />
                </div>
            </section >

            {/* Carrousel */}
            < section id='carrousel' className='overflow-hidden min-h-max p-4 border ' >
                <h2>Carrousel</h2>
                <Carousel>
                    <CardMD><h3>Élément 1</h3><p>Contenu du carrousel.</p></CardMD>
                    <CardMD><h3>Élément 2</h3><p>Contenu du carrousel.</p></CardMD>
                    <CardMD><h3>Élément 3</h3><p>Contenu du carrousel.</p></CardMD>
                    <CardMD><h3>Élément 4</h3><p>Contenu du carrousel.</p></CardMD>
                </Carousel>
            </section >

            {/* --- AJOUTS DE LA V3 --- */}

            {/* AppBar */}
            <section id="app-bar" className="md3-section">
                <h2>App Bar</h2>
                <AppBar>
                    <span className="material-icons" style={{ marginRight: '1rem' }}>menu</span>
                    <h3>Titre de l'application</h3>
                    <div style={{ marginLeft: 'auto' }}>
                        <Button variant="text" children={<Icon icon="search" />} />
                        <Button variant="text" children={<Icon icon="favorite" />} />
                    </div>
                </AppBar>
            </section>

            {/* FAB Menu */}
            <section id="fab-menu" className="md3-section" style={{ position: 'relative', minHeight: '200px' }}>
                <h2>FAB Menu</h2>
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                    <FabMenu mainIcon={<span className="material-icons">add</span>}>
                        <Fab variant="small" icon={<span className="material-icons">edit</span>} />
                        <Fab variant="small" icon={<span className="material-icons">share</span>} />
                    </FabMenu>
                </div>
            </section>

            {/* Boutons segmentés */}
            <section id="segmented-button" className="md3-section gap-2">
                <h2>Boutons Segmentés</h2>
                <SegmentedButton
                    value={buttonValue}
                    onChange={(val: any) => setButtonValue(val)}
                    color="green"
                    size="small"
                    options={
                        [
                            { value: '1', label: 'Option' },
                            { value: '2', label: 'Option 2' },
                            { value: '3', label: 'Option 3' },
                        ]
                    }
                /><SegmentedButton
                    value={buttonValue}
                    onChange={(val: any) => setButtonValue(val)}
                    color="orange"
                    size="small"
                    options={
                        [
                            { value: '1', label: 'Option' },
                            { value: '2', label: 'Option 2' },
                            { value: '3', label: 'Option 3' },
                        ]
                    }
                />
                <SegmentedButton
                    value={buttonValue}
                    onChange={(val: any) => setButtonValue(val)}
                    color="rose"
                    size="small"
                    options={
                        [
                            { value: '1', label: 'Option' },
                            { value: '2', label: 'Option 2' },
                            { value: '3', label: 'Option 3' },
                        ]
                    }
                />
                <SegmentedButton
                    value={buttonValue}
                    onChange={(val: any) => setButtonValue(val)}
                    color="cyan"
                    size="small"
                    options={
                        [
                            { value: '1', label: 'Option' },
                            { value: '2', label: 'Option 2' },
                            { value: '3', label: 'Option 3' },
                        ]
                    }
                />
                <SegmentedButton
                    value={buttonValue}
                    onChange={(val: any) => setButtonValue(val)}
                    color="sky"
                    size="small"
                    options={
                        [
                            { value: '1', label: 'Option' },
                            { value: '2', label: 'Option 2' },
                        ]
                    }
                />
                <SegmentedButton
                    value={buttonValue}
                    onChange={(val: any) => setButtonValue(val)}
                    color="primary"
                    size="large"
                    options={
                        [
                            { value: '1', label: 'Option', icon: { icon: 'home', size: 'xl' } },
                            { value: '2', label: 'Option 2' },
                            { value: '3', label: 'Option 3' },
                        ]
                    }
                />
            </section>

            {/* Date/Time Pickers */}
            <section id="date-time-pickers" className="md3-section">
                <h2>Date & Time Pickers</h2>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                    <DatePicker>
                        <div className="md3-picker-date-item active">15</div>
                        <div className="md3-picker-date-item">16</div>
                        <div className="md3-picker-date-item">17</div>
                    </DatePicker>
                    <TimePicker>
                        <div className="md3-picker-time-item active">10:00</div>
                        <div className="md3-picker-time-item">11:00</div>
                        <div className="md3-picker-time-item">12:00</div>
                    </TimePicker>
                </div>
            </section>

            {/* Navigation */}
            <section id="navigation" className="md3-section">
                <h2>Navigation</h2>
                <h3>Barre de Navigation</h3>
                <NavigationBar>
                    <NavigationBarItem label="Accueil" icon={<span className="material-icons">home</span>} active />
                    <NavigationBarItem label="Recherche" icon={<span className="material-icons">search</span>} />
                    <NavigationBarItem label="Profil" icon={<span className="material-icons">person</span>} />
                </NavigationBar>
                <h3>Tiroir de Navigation</h3>
                <Button onClick={() => setIsDrawerOpen(true)}>Ouvrir le Tiroir</Button>
                <NavigationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                    <h3 style={{ padding: '1rem', margin: '0' }}>Menu</h3>
                    <List>
                        <ListItem>Item 1</ListItem>
                        <ListItem>Item 2</ListItem>
                        <ListItem>Item 3</ListItem>
                    </List>
                    <div style={{ padding: '1rem' }}>
                        <Button variant="text" onClick={() => setIsDrawerOpen(false)}>Fermer</Button>
                    </div>
                </NavigationDrawer>
                <h3>Feuille de Navigation Latérale</h3>
                <Button onClick={() => setIsSideSheetOpen(true)}>Ouvrir la Feuille Latérale</Button>
                <SideSheet isOpen={isSideSheetOpen} onClose={() => setIsSideSheetOpen(false)}>
                    <div style={{ padding: '1rem' }}>
                        <h3>Titre de la feuille</h3>
                        <p>Contenu de la feuille latérale.</p>
                        <Button variant="text" onClick={() => setIsSideSheetOpen(false)}>Fermer</Button>
                    </div>
                </SideSheet>
            </section>

            {/* Checkbox & Chips */}
            <section id="checkbox-chips" className="md3-section">
                <h2>Checkbox & Chips</h2>
                <div className="md3-component-group">
                    <Checkbox checked={isCheckboxOn} onChange={setIsCheckboxOn} label="Accepter les termes" />
                    <Chip variant="filled" label="Chip rempli" />
                    <Chip variant="outlined" label="Chip contour" />
                </div>
            </section>

            {/* List & Menu */}
            <section id="list-menu" className="md3-section">
                <h2>Listes et Menus</h2>
                <List>
                    <ListItem>Item de la liste 1</ListItem>
                    <ListItem>Item de la liste 2</ListItem>
                </List>
                <div style={{ position: 'relative' }}>
                    <Button onClick={handleMenuClick}>Ouvrir le Menu</Button>
                    <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} anchorElement={menuAnchorEl}>
                        <MenuItem onClick={() => alert('Option 1')}>Option 1</MenuItem>
                        <MenuItem onClick={() => alert('Option 2')}>Option 2</MenuItem>
                    </Menu>
                </div>
            </section>

            {/* Sliders */}
            <section id="sliders" className="md3-section">
                <h2>Sliders</h2>
                <div className="md3-component-group flex flex-col w-[80%] gap-2">

                    <Slider
                        id="primary"
                        size='xsmall'
                        key='primary'
                        value={sliderValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.preventDefault();
                            setSliderValue(Number(e.target.value))
                        }}
                    />

                    <Slider
                        id='rose'
                        size='small'
                        key='rose'
                        color="rose"
                        value={sliderValue2}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSliderValue2(Number(e.target.value))}
                    />

                    <Slider
                        size='medium'
                        id='secondary'
                        key='secondary'
                        color="secondary"
                        value={sliderValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSliderValue(Number(e.target.value))}
                    />

                    <Slider
                        id='tertiary'
                        size='large'
                        key='cyan'
                        color="cyan"
                        value={sliderValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSliderValue(Number(e.target.value))}
                    />

                </div>
            </section>
            {/* PROGRESS BAR */}
            <section id="progress-bar" className="md3-section w-[50%] gap-12 py-11">
                <h2>Barre de progression</h2>
                <ProgressBar value={sliderValue} size='xxsmall' />
                <ProgressBar value={sliderValue2} variant="wavy" color="rose" size='xsmall' />
                <ProgressBar value={sliderValue} color="orange" size='small' />
                <ProgressBar value={sliderValue} variant="wavy" color="secondary" size='medium' />
                <ProgressBar value={78} color="cyan" variant="wavy" size='large' />
            </section>
            {/* PROGRESS RING */}
            <section id="progress-ring" className="md3-section w-[80%] flex-row  gap-4">
                <h2>Barre de progression</h2>
                <ProgressRing value={sliderValue} />
                <ProgressRing value={sliderValue2} color="rose" />
                <ProgressRing value={90} color="secondary" />
                <ProgressRing value={sliderValue} color="cyan" />
            </section>

            {/* Tabs */}
            <section id="tabs" className="md3-section">
                <h2>Tabs</h2>
                <Tabs activeTab={activeTab} onTabClick={setActiveTab}>
                    <div  >Onglet 1</div>
                    <div >Onglet 2</div>
                    <div >Onglet 3</div>
                </Tabs>
                <div style={{ padding: '1rem', border: '1px solid var(--md3-outline-variant)' }}>
                    {activeTab === 'tab1' && <p>Contenu de l'onglet 1.</p>}
                    {activeTab === 'tab2' && <p>Contenu de l'onglet 2.</p>}
                    {activeTab === 'tab3' && <p>Contenu de l'onglet 3.</p>}
                </div>
            </section>

            {/* Tooltips */}
            <section id="tooltips" className="md3-section">
                <h2>Tooltips</h2>
                <Tooltip
                    content="Ceci est une info-bulle">
                    <Button variant="outlined">Survolez-moi</Button>
                </Tooltip>
            </section>
        </div >
    );
};

export default MD3DemoPage;